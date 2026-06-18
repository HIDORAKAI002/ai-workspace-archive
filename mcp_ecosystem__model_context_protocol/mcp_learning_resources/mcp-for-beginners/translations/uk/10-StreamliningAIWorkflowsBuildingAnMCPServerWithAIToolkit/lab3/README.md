# 🔧 Модуль 3: Розширена розробка MCP за допомогою Microsoft Foundry Toolkit

![Duration](https://img.shields.io/badge/Duration-20_minutes-blue?style=flat-square)
![Microsoft Foundry Toolkit](https://img.shields.io/badge/Microsoft_Foundry_Toolkit-Required-orange?style=flat-square)
![Python](https://img.shields.io/badge/Python-3.10+-green?style=flat-square)
![MCP SDK](https://img.shields.io/badge/MCP_SDK-1.9.3-purple?style=flat-square)
![Inspector](https://img.shields.io/badge/MCP_Inspector-0.14.0-blue?style=flat-square)

## 🎯 Навчальні цілі

До кінця цього лабораторного заняття ви зможете:

- ✅ Створювати власні MCP сервери за допомогою Microsoft Foundry Toolkit
- ✅ Налаштовувати та використовувати останній MCP Python SDK (v1.9.3)
- ✅ Налаштовувати та використовувати MCP Inspector для налагодження
- ✅ Налагоджувати MCP сервери у середовищах Agent Builder та Inspector
- ✅ Розуміти розширені робочі процеси розробки MCP серверів

## 📋 Передумови

- Завершення Лабораторії 2 (Основи MCP)
- VS Code з встановленим розширенням Microsoft Foundry Toolkit
- Середовище Python 3.10+
- Node.js та npm для налаштування Inspector

## 🏗️ Що ви побудуєте

У цій лабораторії ви створите **Weather MCP Server**, який демонструє:
- Власну реалізацію MCP сервера
- Інтеграцію з Agent Builder Microsoft Foundry Toolkit
- Професійні робочі процеси налагодження
- Сучасні патерни використання MCP SDK

---

## 🔧 Огляд основних компонентів

### 🐍 MCP Python SDK
SDK для Model Context Protocol на Python забезпечує основу для створення власних MCP серверів. Ви будете використовувати версію 1.9.3 із розширеними можливостями налагодження.

### 🔍 MCP Inspector
Потужний інструмент налагодження, який забезпечує:
- Моніторинг сервера в реальному часі
- Візуалізацію виконання інструментів
- Інспекцію мережевих запитів та відповідей
- Інтерактивне тестування

---

## 📖 Покрокова реалізація

### Крок 1: Створення WeatherAgent в Agent Builder

1. **Запустіть Agent Builder** у VS Code через розширення Microsoft Foundry Toolkit
2. **Створіть нового агента** з такою конфігурацією:
   - Ім'я агента: `WeatherAgent`

![Agent Creation](../../../../translated_images/uk/Agent.c9c33f6a412b4cde.webp)

### Крок 2: Ініціалізація проекту MCP Server

1. **Перейдіть до Tools** → **Add Tool** в Agent Builder
2. **Обрати "MCP Server"** серед доступних опцій
3. **Вибрати "Create A new MCP Server"**
4. **Виберіть шаблон `python-weather`**
5. **Назвіть сервер:** `weather_mcp`

![Python Template Selection](../../../../translated_images/uk/Pythontemplate.9d0a2913c6491500.webp)

### Крок 3: Відкрийте та вивчіть проект

1. **Відкрийте згенерований проект** у VS Code
2. **Огляньте структуру проекту:**
   ```
   weather_mcp/
   ├── src/
   │   ├── __init__.py
   │   └── server.py
   ├── inspector/
   │   ├── package.json
   │   └── package-lock.json
   ├── .vscode/
   │   ├── launch.json
   │   └── tasks.json
   ├── pyproject.toml
   └── README.md
   ```

### Крок 4: Оновіть до останнього MCP SDK

> **🔍 Чому оновлювати?** Ми хочемо використовувати останній MCP SDK (v1.9.3) та сервіс Inspector (0.14.0) для покращених функцій та кращих можливостей налагодження.

#### 4a. Оновіть залежності Python

**Редагуйте `pyproject.toml`:** оновіть [./code/weather_mcp/pyproject.toml](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/pyproject.toml)


#### 4b. Оновіть конфігурацію Inspector

**Редагуйте `inspector/package.json`:** оновіть [./code/weather_mcp/inspector/package.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package.json)

#### 4c. Оновіть залежності Inspector

**Редагуйте `inspector/package-lock.json`:** оновіть [./code/weather_mcp/inspector/package-lock.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package-lock.json)

> **📝 Примітка:** Цей файл містить розгорнуті визначення залежностей. Нижче наведено основну структуру – повний вміст гарантує коректне розв’язання залежностей.


> **⚡ Повний Package Lock:** Повний package-lock.json містить близько 3000 рядків визначень залежностей. Вище показано ключову структуру – для повного розв’язання використовуйте наданий файл.

### Крок 5: Налаштування налагодження у VS Code

*Примітка: Будь ласка, скопіюйте файл за вказаним шляхом, щоб замінити відповідний локальний файл*

#### 5a. Оновіть конфігурацію запуску

**Редагуйте `.vscode/launch.json`:**

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Attach to Local MCP",
      "type": "debugpy",
      "request": "attach",
      "connect": {
        "host": "localhost",
        "port": 5678
      },
      "presentation": {
        "hidden": true
      },
      "internalConsoleOptions": "neverOpen",
      "postDebugTask": "Terminate All Tasks"
    },
    {
      "name": "Launch Inspector (Edge)",
      "type": "msedge",
      "request": "launch",
      "url": "http://localhost:6274?timeout=60000&serverUrl=http://localhost:3001/sse#tools",
      "cascadeTerminateToConfigurations": [
        "Attach to Local MCP"
      ],
      "presentation": {
        "hidden": true
      },
      "internalConsoleOptions": "neverOpen"
    },
    {
      "name": "Launch Inspector (Chrome)",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:6274?timeout=60000&serverUrl=http://localhost:3001/sse#tools",
      "cascadeTerminateToConfigurations": [
        "Attach to Local MCP"
      ],
      "presentation": {
        "hidden": true
      },
      "internalConsoleOptions": "neverOpen"
    }
  ],
  "compounds": [
    {
      "name": "Debug in Agent Builder",
      "configurations": [
        "Attach to Local MCP"
      ],
      "preLaunchTask": "Open Agent Builder",
    },
    {
      "name": "Debug in Inspector (Edge)",
      "configurations": [
        "Launch Inspector (Edge)",
        "Attach to Local MCP"
      ],
      "preLaunchTask": "Start MCP Inspector",
      "stopAll": true
    },
    {
      "name": "Debug in Inspector (Chrome)",
      "configurations": [
        "Launch Inspector (Chrome)",
        "Attach to Local MCP"
      ],
      "preLaunchTask": "Start MCP Inspector",
      "stopAll": true
    }
  ]
}
```

**Редагуйте `.vscode/tasks.json`:**

```
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start MCP Server",
      "type": "shell",
      "command": "python -m debugpy --listen 127.0.0.1:5678 src/__init__.py sse",
      "isBackground": true,
      "options": {
        "cwd": "${workspaceFolder}",
        "env": {
          "PORT": "3001"
        }
      },
      "problemMatcher": {
        "pattern": [
          {
            "regexp": "^.*$",
            "file": 0,
            "location": 1,
            "message": 2
          }
        ],
        "background": {
          "activeOnStart": true,
          "beginsPattern": ".*",
          "endsPattern": "Application startup complete|running"
        }
      }
    },
    {
      "label": "Start MCP Inspector",
      "type": "shell",
      "command": "npm run dev:inspector",
      "isBackground": true,
      "options": {
        "cwd": "${workspaceFolder}/inspector",
        "env": {
          "CLIENT_PORT": "6274",
          "SERVER_PORT": "6277",
        }
      },
      "problemMatcher": {
        "pattern": [
          {
            "regexp": "^.*$",
            "file": 0,
            "location": 1,
            "message": 2
          }
        ],
        "background": {
          "activeOnStart": true,
          "beginsPattern": "Starting MCP inspector",
          "endsPattern": "Proxy server listening on port"
        }
      },
      "dependsOn": [
        "Start MCP Server"
      ]
    },
    {
      "label": "Open Agent Builder",
      "type": "shell",
      "command": "echo ${input:openAgentBuilder}",
      "presentation": {
        "reveal": "never"
      },
      "dependsOn": [
        "Start MCP Server"
      ],
    },
    {
      "label": "Terminate All Tasks",
      "command": "echo ${input:terminate}",
      "type": "shell",
      "problemMatcher": []
    }
  ],
  "inputs": [
    {
      "id": "openAgentBuilder",
      "type": "command",
      "command": "ai-mlstudio.agentBuilder",
      "args": {
        "initialMCPs": [ "local-server-weather_mcp" ],
        "triggeredFrom": "vsc-tasks"
      }
    },
    {
      "id": "terminate",
      "type": "command",
      "command": "workbench.action.tasks.terminate",
      "args": "terminateAll"
    }
  ]
}
```


---

## 🚀 Запуск та тестування вашого MCP сервера

### Крок 6: Встановлення залежностей

Після внесення конфігураційних змін виконайте такі команди:

**Встановіть залежності Python:**
```bash
uv sync
```

**Встановіть залежності Inspector:**
```bash
cd inspector
npm install
```

### Крок 7: Налагодження з Agent Builder

1. **Натисніть F5** або використайте конфігурацію **"Debug in Agent Builder"**
2. **Виберіть compound конфігурацію** у панелі налагодження
3. **Чекайте запуску сервера** та відкриття Agent Builder
4. **Перевірте ваш weather MCP server** за допомогою запитів природною мовою

Введіть промпт, як-от

SYSTEM_PROMPT

```
You are my weather assistant
```

USER_PROMPT

```
How's the weather like in Seattle
```

![Agent Builder Debug Result](../../../../translated_images/uk/Result.6ac570f7d2b1d538.webp)

### Крок 8: Налагодження з MCP Inspector

1. **Використовуйте конфігурацію "Debug in Inspector"** (Edge або Chrome)
2. **Відкрийте інтерфейс Inspector** за адресою `http://localhost:6274`
3. **Дослідіть інтерактивне тестове середовище:**
   - Перегляньте доступні інструменти
   - Перевірте виконання інструментів
   - Моніторинг мережевих запитів
   - Налагодження відповідей сервера

![MCP Inspector Interface](../../../../translated_images/uk/Inspector.5672415cd02fe873.webp)

---

## 🎯 Основні результати навчання

Завершивши цю лабораторію, ви:

- [x] **Створили власний MCP сервер** за допомогою шаблонів Microsoft Foundry Toolkit
- [x] **Оновилися до останнього MCP SDK** (v1.9.3) для розширеної функціональності
- [x] **Налаштували професійні робочі процеси налагодження** для Agent Builder та Inspector
- [x] **Налаштували MCP Inspector** для інтерактивного тестування сервера
- [x] **Опановували налагодження в VS Code** для розробки MCP

## 🔧 Досліджені розширені функції

| Функція | Опис | Випадок використання |
|---------|-------------|----------|
| **MCP Python SDK v1.9.3** | Найновіша реалізація протоколу | Сучасна розробка серверів |
| **MCP Inspector 0.14.0** | Інтерактивний інструмент налагодження | Тестування серверу в реальному часі |
| **Налагодження VS Code** | Інтегроване середовище розробки | Професійний робочий процес налагодження |
| **Інтеграція Agent Builder** | Пряме з'єднання з Microsoft Foundry Toolkit | Повне тестування агента |

## 📚 Додаткові ресурси

- [Документація MCP Python SDK](https://modelcontextprotocol.io/docs/sdk/python)
- [Посібник розширення Microsoft Foundry Toolkit](https://code.visualstudio.com/docs/ai/ai-toolkit)
- [Документація з налагодження VS Code](https://code.visualstudio.com/docs/editor/debugging)
- [Специфікація Model Context Protocol](https://modelcontextprotocol.io/docs/concepts/architecture)

---

**🎉 Вітаємо!** Ви успішно завершили Лабораторію 3 і тепер можете створювати, налагоджувати та розгортати власні MCP сервери, використовуючи професійні робочі процеси розробки.

### 🔜 Продовжуйте до наступного модуля

Готові застосувати ваші навички MCP у реальному робочому процесі розробки? Продовжуйте до **[Модуля 4: Практична розробка MCP - власний сервер клонування GitHub](../lab4/README.md)**, де ви:
- Побудуєте MCP сервер готовий до продакшну, який автоматизує операції з репозиторіями GitHub
- Реалізуєте функціонал клонування репозиторію GitHub через MCP
- Інтегруєте власні MCP сервери з VS Code та GitHub Copilot Agent Mode
- Протестуєте та розгорнете власні MCP сервери у виробничому середовищі
- Вивчите практичну автоматизацію робочих процесів для розробників

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Відмова від відповідальності**:
Цей документ було перекладено за допомогою сервісу штучного інтелекту для перекладу [Co-op Translator](https://github.com/Azure/co-op-translator). Хоча ми прагнемо до точності, будь ласка, майте на увазі, що автоматичні переклади можуть містити помилки або неточності. Оригінальний документ рідною мовою слід вважати авторитетним джерелом. Для критично важливої інформації рекомендується професійний людський переклад. Ми не несемо відповідальності за будь-які непорозуміння або неправильні тлумачення, що виникли внаслідок використання цього перекладу.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->