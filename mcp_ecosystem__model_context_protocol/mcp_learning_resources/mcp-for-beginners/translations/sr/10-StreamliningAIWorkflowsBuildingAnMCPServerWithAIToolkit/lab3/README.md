# 🔧 Модул 3: Напредни развој MCP-а са Microsoft Foundry Toolkit-ом

![Duration](https://img.shields.io/badge/Duration-20_minutes-blue?style=flat-square)
![Microsoft Foundry Toolkit](https://img.shields.io/badge/Microsoft_Foundry_Toolkit-Required-orange?style=flat-square)
![Python](https://img.shields.io/badge/Python-3.10+-green?style=flat-square)
![MCP SDK](https://img.shields.io/badge/MCP_SDK-1.9.3-purple?style=flat-square)
![Inspector](https://img.shields.io/badge/MCP_Inspector-0.14.0-blue?style=flat-square)

## 🎯 Циљеви учења

До краја овог лабораторијског рада, моћи ћете да:

- ✅ Креирате прилагођене MCP сервере користећи Microsoft Foundry Toolkit
- ✅ Конфигуришете и користите најновији MCP Python SDK (в1.9.3)
- ✅ Подесите и искористите MCP Inspector за дебаговање
- ✅ Дебагујете MCP сервере и у Agent Builder и у Inspector окружењима
- ✅ Разумете напредне токове рада развоја MCP сервера

## 📋 Захтеви

- Завршен Лаб 2 (Основе MCP-а)
- VS Code са инсталираним Microsoft Foundry Toolkit екстензијом
- Python окружење верзије 3.10+
- Node.js и npm за подешавање Inspector-а

## 🏗️ Шта ћете направити

У овом лабораторијском, направићете **Weather MCP Server** који демонстрира:
- Прилагођену имплементацију MCP сервера
- Интеграцију са Microsoft Foundry Toolkit Agent Builder-ом
- Професионалне токове рада за дебаговање
- Модерне обрасце коришћења MCP SDK-а

---

## 🔧 Преглед основних компоненти

### 🐍 MCP Python SDK
Model Context Protocol Python SDK пружа основу за изградњу прилагођених MCP сервера. Користићете верзију 1.9.3 са побољшаним могућностима дебаговања.

### 🔍 MCP Inspector
Моћан алат за дебаговање који пружа:
- Надзор сервера у реалном времену
- Визуелизацију извршења алата
- Инспекцију захтева/одговора мреже
- Интерактивно окружење за тестирање

---

## 📖 Корак по корак имплементација

### Корак 1: Креирајте WeatherAgent у Agent Builder-у

1. **Покрените Agent Builder** у VS Code преко Microsoft Foundry Toolkit екстензије
2. **Креирајте новог агента** са следећом конфигурацијом:
   - Име агента: `WeatherAgent`

![Agent Creation](../../../../translated_images/sr/Agent.c9c33f6a412b4cde.webp)

### Корак 2: Иницијализујте MCP Server пројекат

1. **Идите на Tools** → **Add Tool** у Agent Builder-у
2. **Изаберите "MCP Server"** из доступних опција
3. **Одаберите "Create A new MCP Server"**
4. **Изаберите `python-weather` шаблон**
5. **Назовите свој сервер:** `weather_mcp`

![Python Template Selection](../../../../translated_images/sr/Pythontemplate.9d0a2913c6491500.webp)

### Корак 3: Отворите и погледајте пројекат

1. **Отворите генерисани пројекат** у VS Code-у
2. **Прегледајте структуру пројекта:**
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

### Корак 4: Надоградите на најновији MCP SDK

> **🔍 Зашто надоградња?** Желимо да користимо најновији MCP SDK (в1.9.3) и Inspector сервис (0.14.0) за проширене функције и боље могућности дебаговања.

#### 4а. Ажурирајте Python зависности

**Уредите `pyproject.toml`:** ажурирајте [./code/weather_mcp/pyproject.toml](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/pyproject.toml)


#### 4б. Ажурирајте Inspector конфигурацију

**Уредите `inspector/package.json`:** ажурирајте [./code/weather_mcp/inspector/package.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package.json)

#### 4в. Ажурирајте Inspector зависности

**Уредите `inspector/package-lock.json`:** ажурирајте [./code/weather_mcp/inspector/package-lock.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package-lock.json)

> **📝 Напомена:** Овај фајл садржи обимне дефиниције зависности. Испод је основна структура – цео садржај обезбеђује правилно решавање зависности.


> **⚡ Комплетан Package Lock:** Цели package-lock.json садржи око 3000 линија дефиниција зависности. Горе је приказана кључна структура – користите обезбеђени фајл за потпуно решавање зависности.

### Корак 5: Конфигуришите VS Code дебаговање

*Напомена: Молимо копирајте фајл на наведеноj путањи да бисте заменили одговарајући локални фајл*

#### 5а. Ажурирајте Launch конфигурацију

**Уредите `.vscode/launch.json`:**

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

**Уредите `.vscode/tasks.json`:**

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

## 🚀 Покретање и тестирање вашег MCP сервера

### Корак 6: Инсталирајте зависности

Након промене конфигурације, покрените следеће команде:

**Инсталирајте Python зависности:**
```bash
uv sync
```

**Инсталирајте Inspector зависности:**
```bash
cd inspector
npm install
```

### Корак 7: Дебагујте са Agent Builder-ом

1. **Притисните F5** или користите конфигурацију **"Debug in Agent Builder"**
2. **Изаберите compound конфигурацију** са дебаг панела
3. **Сачекајте да се сервер покрене** и Agent Builder отвори
4. **Тестирајте свој weather MCP сервер** са упитима на природном језику

Унесите упит као овај

SYSTEM_PROMPT

```
You are my weather assistant
```

USER_PROMPT

```
How's the weather like in Seattle
```

![Agent Builder Debug Result](../../../../translated_images/sr/Result.6ac570f7d2b1d538.webp)

### Корак 8: Дебагујте са MCP Inspector-ом

1. **Користите конфигурацију "Debug in Inspector"** (Edge или Chrome)
2. **Отворите Inspector интерфејс** на `http://localhost:6274`
3. **Истражите интерактивно тестирачко окружење:**
   - Погледајте доступне алате
   - Тестирајте извршење алата
   - Пратите мрежне захтеве
   - Дебагујте одговоре сервера

![MCP Inspector Interface](../../../../translated_images/sr/Inspector.5672415cd02fe873.webp)

---

## 🎯 Кључни резултати учења

Завршетком овог лабораторијског рада, ви сте:

- [x] **Креирали прилагођени MCP сервер** користећи Microsoft Foundry Toolkit шаблоне
- [x] **Надоградили на најновији MCP SDK** (в1.9.3) за побољшане функционалности
- [x] **Конфигурисали професионалне токове рада дебаговања** за Agent Builder и Inspector
- [x] **Подесили MCP Inspector** за интерактивно тестирање сервера
- [x] **Мастерирали VS Code конфигурације за дебаговање** у развоју MCP-а

## 🔧 Напредне функционалности које су проучаване

| Функција | Опис | Примена |
|---------|-------------|----------|
| **MCP Python SDK в1.9.3** | Најновија имплементација протокола | Модеран развој сервера |
| **MCP Inspector 0.14.0** | Интерактивни алат за дебаговање | Тестирање сервера у реалном времену |
| **VS Code Debugging** | Интегрисано развојно окружење | Професионални ток рада дебаговања |
| **Agent Builder интеграција** | Директна веза са Microsoft Foundry Toolkit-ом | Целокупно тестирање агента |

## 📚 Додатни ресурси

- [MCP Python SDK документација](https://modelcontextprotocol.io/docs/sdk/python)
- [Microsoft Foundry Toolkit упутство за екстензију](https://code.visualstudio.com/docs/ai/ai-toolkit)
- [VS Code документација за дебаговање](https://code.visualstudio.com/docs/editor/debugging)
- [Model Context Protocol спецификација](https://modelcontextprotocol.io/docs/concepts/architecture)

---

**🎉 Честитамо!** Успешно сте завршили Лаб 3 и сада можете да креирате, дебагујете и деплојујете прилагођене MCP сервере користећи професионалне токове рада.

### 🔜 Наставите на следећи модул

Спремни да примените своје MCP вештине у реалном развојном току? Наставите на **[Модул 4: Практични развој MCP-а - прилагођени GitHub Clone Server](../lab4/README.md)** где ћете:
- Изградити production-ready MCP сервер који аутоматизује операције над GitHub репозиторијумима
- Имплементирати функционалност клонирања GitHub репозиторијума преко MCP-а
- Интегрисати прилагођене MCP сервере са VS Code и GitHub Copilot Agent Mode
- Тестирати и деплојовати прилагођене MCP сервере у production окружењима
- Учити практичну аутоматизацију токова рада за програмере

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Изјава о одрицању одговорности**:
Овај документ је преведен коришћењем услуге за аутоматски превод [Co-op Translator](https://github.com/Azure/co-op-translator). Иако тежимо тачности, имајте у виду да аутоматски преводи могу садржати грешке или нетачности. Оригинални документ на његовом изворном језику треба сматрати ауторитативним извором. За критичне информације препоручује се професионални људски превод. Нисмо одговорни за било каква неспоразума или погрешна тумачења која произилазе из коришћења овог превода.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->