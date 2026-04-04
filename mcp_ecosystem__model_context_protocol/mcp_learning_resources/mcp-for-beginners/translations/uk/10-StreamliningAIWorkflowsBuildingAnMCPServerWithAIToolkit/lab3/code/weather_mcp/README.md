# Weather MCP Server

Це приклад MCP сервера на Python, який реалізує інструменти погоди з макетованими відповідями. Його можна використовувати як основу для власного MCP сервера. Він включає такі функції:

- **Інструмент Погоди**: інструмент, який надає макетовану інформацію про погоду на основі вказаного місцезнаходження.
- **Підключення до Agent Builder**: функція, яка дозволяє підключити MCP сервер до Agent Builder для тестування та налагодження.
- **Налагодження в [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: функція, що дозволяє налагоджувати MCP Server за допомогою MCP Inspector.

## Початок роботи з шаблоном Weather MCP Server

> **Передумови**
>
> Для запуску MCP сервера на локальній машині розробника вам знадобиться:
>
> - [Python](https://www.python.org/)
> - (*Необов’язково - якщо ви віддаєте перевагу uv*) [uv](https://github.com/astral-sh/uv)
> - Розширення Python Debugger для VS Code: [Python Debugger Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Підготовка середовища

Існує два способи налаштування середовища для цього проекту. Ви можете обрати будь-який відповідно до ваших вподобань.

> Примітка: Перезавантажте VSCode або термінал, щоб підтвердити використання python з віртуального середовища після його створення.

| Підхід | Кроки |
| -------- | ----- |
| Використання `uv` | 1. Створіть віртуальне середовище: `uv venv` <br>2. У VSCode виконайте команду "***Python: Select Interpreter***" і виберіть python зі створеного віртуального середовища <br>3. Встановіть залежності (включно з dev): `uv pip install -r pyproject.toml --extra dev` |
| Використання `pip` | 1. Створіть віртуальне середовище: `python -м venv .venv` <br>2. У VSCode виконайте команду "***Python: Select Interpreter***" і виберіть python зі створеного віртуального середовища<br>3. Встановіть залежності (включно з dev): `pip install -e .[dev]` |

Після налаштування середовища ви можете запустити сервер на локальній машині розробника через Agent Builder як MCP клієнт, щоб розпочати роботу:
1. Відкрийте панель налагодження VS Code. Виберіть `Debug in Agent Builder` або натисніть `F5`, щоб почати налагодження MCP сервера.
2. Використовуйте AI Toolkit Agent Builder для тестування сервера за допомогою [цього запиту](../../../../../../../../../../../open_prompt_builder). Сервер буде автоматично підключений до Agent Builder.
3. Натисніть `Run`, щоб протестувати сервер із запитом.

**Вітаємо**! Ви успішно запустили Weather MCP Server на локальній машині розробника через Agent Builder як MCP клієнт.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Що входить до шаблону

| Папка / Файл | Вміст                                     |
| ------------ | ------------------------------------------ |
| `.vscode`    | Файли VSCode для налагодження              |
| `.aitk`      | Конфігурації для AI Toolkit                 |
| `src`        | Початковий код для weather mcp сервера     |

## Як налагоджувати Weather MCP Server

> Примітки:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) — це візуальний інструмент розробника для тестування та налагодження MCP серверів.
> - Усі режими налагодження підтримують точки зупину, тому ви можете додавати точки зупину в код реалізації інструменту.

| Режим налагодження | Опис | Кроки налагодження |
| ------------------ | ----- | ------------------- |
| Agent Builder | Налагоджуйте MCP сервер у Agent Builder через AI Toolkit. | 1. Відкрийте панель налагодження VS Code. Виберіть `Debug in Agent Builder` і натисніть `F5`, щоб почати налагодження MCP сервера.<br>2. Використайте AI Toolkit Agent Builder для тестування сервера за допомогою [цього запиту](../../../../../../../../../../../open_prompt_builder). Сервер буде автоматично підключений до Agent Builder.<br>3. Натисніть `Run`, щоб протестувати сервер із запитом. |
| MCP Inspector | Налагоджуйте MCP сервер за допомогою MCP Inspector. | 1. Встановіть [Node.js](https://nodejs.org/)<br> 2. Налаштуйте Inspector: `cd inspector` && `npm install` <br> 3. Відкрийте панель налагодження VS Code. Виберіть `Debug SSE in Inspector (Edge)` або `Debug SSE in Inspector (Chrome)`. Натисніть F5 для початку налагодження.<br> 4. Коли MCP Inspector відкриється у браузері, натисніть кнопку `Connect`, щоб підключити цей MCP сервер.<br> 5. Потім ви можете `List Tools`, вибрати інструмент, ввести параметри і `Run Tool`, щоб налагодити код сервера.<br> |

## Стандартні порти та налаштування

| Режим налагодження | Порти | Визначення | Налаштування | Примітка |
| ------------------ | ----- | ---------- | ------------ | -------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Редагуйте [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [__init__.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json), щоб змінити вказані порти. | Немає |
| MCP Inspector | 3001 (сервер); 5173 та 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Редагуйте [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [__init__.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json), щоб змінити вказані порти. | Немає |

## Зворотній зв’язок

Якщо у вас є відгуки чи пропозиції щодо цього шаблону, будь ласка, відкрийте issue у [репозиторії AI Toolkit на GitHub](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Відмова від відповідальності**:  
Цей документ було перекладено за допомогою сервісу автоматичного перекладу AI [Co-op Translator](https://github.com/Azure/co-op-translator). Хоча ми прагнемо до точності, зверніть увагу, що автоматичні переклади можуть містити помилки або неточності. Оригінальний документ на рідній мові слід вважати авторитетним джерелом. Для критично важливої інформації рекомендується звертатися до професійного людського перекладу. Ми не несемо відповідальності за будь-які непорозуміння чи неправильні тлумачення, що виникли внаслідок використання цього перекладу.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->