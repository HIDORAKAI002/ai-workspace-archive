# 🔧 Модул 3: Разширена разработка на MCP със средствата на Microsoft Foundry Toolkit

![Продължителност](https://img.shields.io/badge/Duration-20_minutes-blue?style=flat-square)
![Microsoft Foundry Toolkit](https://img.shields.io/badge/Microsoft_Foundry_Toolkit-Required-orange?style=flat-square)
![Python](https://img.shields.io/badge/Python-3.10+-green?style=flat-square)
![MCP SDK](https://img.shields.io/badge/MCP_SDK-1.9.3-purple?style=flat-square)
![Inspector](https://img.shields.io/badge/MCP_Inspector-0.14.0-blue?style=flat-square)

## 🎯 Учебни цели

В края на тази лабораторна работа ще можете да:

- ✅ Създавате персонализирани MCP сървъри, използвайки Microsoft Foundry Toolkit
- ✅ Конфигурирате и използвате най-новия MCP Python SDK (v1.9.3)
- ✅ Настроите и използвате MCP Inspector за дебъгване
- ✅ Отстранявате грешки в MCP сървъри в среди Agent Builder и Inspector
- ✅ Разбирате разширени работни процеси за разработка на MCP сървъри

## 📋 Предварителни изисквания

- Завършване на Лаборатория 2 (Основи на MCP)
- VS Code с инсталирано разширение Microsoft Foundry Toolkit
- Python 3.10+ среда
- Node.js и npm за настройка на Inspector

## 🏗️ Какво ще изградите

В тази лабораторна работа ще създадете **Weather MCP Server**, който демонстрира:
- Персонализирана имплементация на MCP сървър
- Интеграция с Agent Builder на Microsoft Foundry Toolkit
- Професионални работни процеси за дебъгване
- Съвременни модели на използване на MCP SDK

---

## 🔧 Обзор на основните компоненти

### 🐍 MCP Python SDK
Python SDK за Model Context Protocol осигурява основата за изграждане на персонализирани MCP сървъри. Ще използвате версия 1.9.3 с разширени възможности за дебъгване.

### 🔍 MCP Inspector
Мощен инструмент за дебъгване, който предлага:
- Мониторинг на сървъра в реално време
- Визуализация на изпълнението на инструменти
- Проверка на мрежови заявки/отговори
- Интерактивна тестова среда

---

## 📖 Стъпка по стъпка имплементация

### Стъпка 1: Създайте WeatherAgent в Agent Builder

1. **Стартирайте Agent Builder** във VS Code чрез разширението Microsoft Foundry Toolkit
2. **Създайте нов агент** със следната конфигурация:
   - Име на агента: `WeatherAgent`

![Създаване на агент](../../../../translated_images/bg/Agent.c9c33f6a412b4cde.webp)

### Стъпка 2: Инициализиране на MCP Server проект

1. **Отидете на Tools** → **Add Tool** в Agent Builder
2. **Изберете "MCP Server"** от наличните опции
3. **Изберете "Create A new MCP Server"**
4. **Изберете шаблона `python-weather`**
5. **Дайте име на сървъра:** `weather_mcp`

![Избор на Python шаблон](../../../../translated_images/bg/Pythontemplate.9d0a2913c6491500.webp)

### Стъпка 3: Отворете и разгледайте проекта

1. **Отворете генерирания проект** във VS Code
2. **Прегледайте структурата на проекта:**
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

### Стъпка 4: Ъпгрейд до най-новия MCP SDK

> **🔍 Защо ъпгрейд?** Искаме да използваме най-новия MCP SDK (v1.9.3) и Inspector услуга (0.14.0) за подобрени функции и по-добри възможности за дебъгване.

#### 4а. Актуализиране на Python зависимости

**Редактирайте `pyproject.toml`:** актуализирайте [./code/weather_mcp/pyproject.toml](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/pyproject.toml)


#### 4б. Актуализиране на конфигурацията на Inspector

**Редактирайте `inspector/package.json`:** актуализирайте [./code/weather_mcp/inspector/package.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package.json)

#### 4в. Актуализиране на зависимости на Inspector

**Редактирайте `inspector/package-lock.json`:** актуализирайте [./code/weather_mcp/inspector/package-lock.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package-lock.json)

> **📝 Забележка:** Този файл съдържа подробни дефиниции на зависимости. По-долу е показана основната структура – пълното съдържание осигурява правилно разрешаване на зависимости.


> **⚡ Пълен Package Lock:** Пълният файл package-lock.json съдържа около 3000 реда дефиниции на зависимости. По-горе е показана ключовата структура – използвайте предоставения файл за пълно разрешаване на зависимости.

### Стъпка 5: Конфигуриране на дебъгване във VS Code

*Забележка: Моля, копирайте файла в посочения път, за да замените съответния локален файл*

#### 5а. Актуализиране на Launch конфигурация

**Редактирайте `.vscode/launch.json`:**

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

**Редактирайте `.vscode/tasks.json`:**

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

## 🚀 Стартиране и тестване на вашия MCP сървър

### Стъпка 6: Инсталиране на зависимости

След извършване на конфигурационните промени, изпълнете следните команди:

**Инсталирайте Python зависимости:**
```bash
uv sync
```

**Инсталирайте зависимости за Inspector:**
```bash
cd inspector
npm install
```

### Стъпка 7: Дебъгване с Agent Builder

1. **Натиснете F5** или използвайте конфигурацията **"Debug in Agent Builder"**
2. **Изберете комбинираната конфигурация** от панела за дебъгване
3. **Изчакайте сървърът да стартира** и Agent Builder да се отвори
4. **Тествайте вашия weather MCP сървър** с въпроси на естествен език

Въведете заявка като тази

SYSTEM_PROMPT

```
You are my weather assistant
```

USER_PROMPT

```
How's the weather like in Seattle
```

![Резултат от дебъгване в Agent Builder](../../../../translated_images/bg/Result.6ac570f7d2b1d538.webp)

### Стъпка 8: Дебъгване с MCP Inspector

1. **Използвайте конфигурацията "Debug in Inspector"** (Edge или Chrome)
2. **Отворете интерфейса на Inspector** на `http://localhost:6274`
3. **Разгледайте интерактивната тестова среда:**
   - Преглеждайте наличните инструменти
   - Тествайте изпълнението на инструменти
   - Следете мрежовите заявки
   - Отстранявайте грешки в отговори от сървъра

![Интерфейс на MCP Inspector](../../../../translated_images/bg/Inspector.5672415cd02fe873.webp)

---

## 🎯 Основни учебни резултати

След завършване на тази лаборатория, вие:

- [x] **Създадохте персонализиран MCP сървър** с помощта на шаблони на Microsoft Foundry Toolkit
- [x] **Ъпгрейднахте до най-новия MCP SDK** (v1.9.3) за разширена функционалност
- [x] **Конфигурирахте професионални работни процеси за дебъгване** в Agent Builder и Inspector
- [x] **Настроихте MCP Inspector** за интерактивно тестване на сървъра
- [x] **Усвоихте конфигурациите за дебъгване във VS Code** за разработка на MCP

## 🔧 Разгледани разширени функции

| Функция | Описание | Случай на използване |
|---------|-------------|----------|
| **MCP Python SDK v1.9.3** | Най-новата имплементация на протокола | Модерна разработка на сървъри |
| **MCP Inspector 0.14.0** | Интерактивен инструмент за дебъгване | Тестване на сървъра в реално време |
| **Дебъгване във VS Code** | Интегрирана развойна среда | Професионален работен процес за дебъгване |
| **Интеграция с Agent Builder** | Директна връзка с Microsoft Foundry Toolkit | Пълноценно тестване на агенти |

## 📚 Допълнителни ресурси

- [MCP Python SDK Документация](https://modelcontextprotocol.io/docs/sdk/python)
- [Ръководство за разширението Microsoft Foundry Toolkit](https://code.visualstudio.com/docs/ai/ai-toolkit)
- [Документация за дебъгване във VS Code](https://code.visualstudio.com/docs/editor/debugging)
- [Спецификация на Model Context Protocol](https://modelcontextprotocol.io/docs/concepts/architecture)

---

**🎉 Поздравления!** Успешно завършихте Лаборатория 3 и вече можете да създавате, дебъгвате и публикувате персонализирани MCP сървъри, използвайки професионални работни процеси за разработка.

### 🔜 Продължете към следващия модул

Готови ли сте да приложите уменията си в реален работен процес за разработка на MCP? Продължете към **[Модул 4: Практическа разработка на MCP - Персонализиран GitHub Clone Server](../lab4/README.md)**, където ще:
- Изградите MCP сървър, готов за продукция, който автоматизира операции с GitHub репозитории
- Имплементирате функционалност за клониране на GitHub репозитории чрез MCP
- Интегирате персонализирани MCP сървъри с VS Code и GitHub Copilot Agent Mode
- Тествате и публикувате персонализирани MCP сървъри в продукционна среда
- Научите практическа автоматизация на работни процеси за разработчици

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Отказ от отговорност**:
Този документ е преведен с помощта на AI преводачески услуга [Co-op Translator](https://github.com/Azure/co-op-translator). Въпреки че се стремим към точност, моля имайте предвид, че автоматизираните преводи могат да съдържат грешки или неточности. Оригиналният документ на неговия роден език трябва да се счита за авторитетен източник. За критична информация се препоръчва професионален човешки превод. Ние не носим отговорност за каквито и да е недоразумения или неправилни тълкувания, произтичащи от използването на този превод.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->