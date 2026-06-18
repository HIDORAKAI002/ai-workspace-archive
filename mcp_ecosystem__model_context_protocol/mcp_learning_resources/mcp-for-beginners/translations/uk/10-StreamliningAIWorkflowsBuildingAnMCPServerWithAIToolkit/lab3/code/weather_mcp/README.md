# Weather MCP Server

Це зразок MCP сервера на Python, що реалізує інструменти погоди з мок-відповідями. Його можна використовувати як каркас для власного MCP сервера. Включає наступні можливості:

- **Інструмент погоди**: Інструмент, що надає змодельовану інформацію про погоду на основі заданого місцезнаходження.
- **Підключення до Agent Builder**: Функція, що дозволяє підключити MCP сервер до Agent Builder для тестування та налагодження.
- **Налагодження в [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: Функція, що дозволяє налагоджувати MCP сервер за допомогою MCP Inspector.

## Початок роботи з шаблоном Weather MCP Server

> **Вимоги**
>
> Для запуску MCP сервера на вашому локальному комп’ютері розробки вам знадобиться:
>
> - [Python](https://www.python.org/)
> - (*Опціонально - якщо ви віддаєте перевагу uv*) [uv](https://github.com/astral-sh/uv)
> - [Розширення Python Debugger](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Підготовка середовища

Існує два способи налаштування середовища для цього проєкту. Ви можете обрати будь-який на ваш смак.

> Примітка: Перезапустіть VSCode або термінал, щоб переконатися, що використовується python із віртуального середовища після його створення.

| Підхід | Кроки |
| -------- | ----- |
| Використання `uv` | 1. Створіть віртуальне середовище: `uv venv` <br>2. Запустіть команду VSCode "***Python: Select Interpreter***" та оберіть python зі створеного віртуального середовища <br>3. Встановіть залежності (включно з dev залежностями): `uv pip install -r pyproject.toml --extra dev` |
| Використання `pip` | 1. Створіть віртуальне середовище: `python -m venv .venv` <br>2. Запустіть команду VSCode "***Python: Select Interpreter***" та оберіть python зі створеного віртуального середовища<br>3. Встановіть залежності (включно з dev залежностями): `pip install -e .[dev]` |

Після налаштування середовища можна запустити сервер на локальній машині розробки за допомогою Agent Builder як MCP клієнта для початку роботи:
1. Відкрийте панель налагодження VS Code. Виберіть `Debug in Agent Builder` або натисніть `F5` для початку налагодження MCP сервера.
2. Використайте Microsoft Foundry Toolkit Agent Builder для тестування сервера за допомогою [цього запиту](../../../../../../../../../../../open_prompt_builder). Сервер буде автоматично підключений до Agent Builder.
3. Натисніть `Run` для тестування сервера з цим запитом.

**Вітаємо**! Ви успішно запустили Weather MCP Server на локальній машині розробки через Agent Builder як MCP клієнт.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Що включено до шаблону

| Папка / Файл | Вміст                                     |
| ------------ | -------------------------------------------- |
| `.vscode`    | Файли VSCode для налагодження                   |
| `.aitk`      | Конфігурації для Microsoft Foundry Toolkit                |
| `src`        | Вихідний код weather mcp сервера   |

## Як налагоджувати Weather MCP Server

> Примітки:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) — візуальний інструмент розробника для тестування та налагодження MCP серверів.
> - Усі режими налагодження підтримують точки зупину, тож ви можете додавати їх у код реалізації інструменту.

| Режим налагодження | Опис | Кроки для налагодження |
| ---------- | ----------- | --------------- |
| Agent Builder | Налагодження MCP сервера в Agent Builder через Microsoft Foundry Toolkit. | 1. Відкрийте панель налагодження VS Code. Виберіть `Debug in Agent Builder` та натисніть `F5` для початку налагодження MCP сервера.<br>2. Використайте Microsoft Foundry Toolkit Agent Builder для тестування сервера за допомогою [цього запиту](../../../../../../../../../../../open_prompt_builder). Сервер буде автоматично підключений до Agent Builder.<br>3. Натисніть `Run` для тестування сервера з цим запитом. |
| MCP Inspector | Налагодження MCP сервера за допомогою MCP Inspector. | 1. Встановіть [Node.js](https://nodejs.org/)<br> 2. Налаштуйте Inspector: `cd inspector` && `npm install` <br> 3. Відкрийте панель налагодження VS Code. Виберіть `Debug SSE in Inspector (Edge)` або `Debug SSE in Inspector (Chrome)`. Натисніть F5 для початку налагодження.<br> 4. Коли MCP Inspector відкриється в браузері, натисніть кнопку `Connect` для підключення цього MCP сервера.<br> 5. Потім ви можете `List Tools`, обрати інструмент, ввести параметри та `Run Tool` для налагодження коду сервера.<br> |

## Стандартні порти та налаштування

| Режим налагодження | Порти | Визначення | Налаштування | Примітка |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Відредагуйте [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json), щоб змінити вказані порти. | Н/Д |
| MCP Inspector | 3001 (сервер); 5173 та 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Відредагуйте [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json), щоб змінити вказані порти.| Н/Д |

## Зворотній зв’язок

Якщо у вас є відгуки чи пропозиції щодо цього шаблону, будь ласка, відкрийте issue у репозиторії [Microsoft Foundry Toolkit GitHub](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Відмова від відповідальності**:
Цей документ було перекладено за допомогою сервісу штучного інтелекту для перекладу [Co-op Translator](https://github.com/Azure/co-op-translator). Хоча ми прагнемо до точності, будь ласка, майте на увазі, що автоматичні переклади можуть містити помилки або неточності. Оригінальний документ рідною мовою слід вважати авторитетним джерелом. Для критично важливої інформації рекомендується професійний людський переклад. Ми не несемо відповідальності за будь-які непорозуміння або неправильні тлумачення, що виникли внаслідок використання цього перекладу.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->