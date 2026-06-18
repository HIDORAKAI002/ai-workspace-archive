# 🔧 3. modul: Fejlett MCP fejlesztés a Microsoft Foundry Toolkit segítségével

![Duration](https://img.shields.io/badge/Duration-20_minutes-blue?style=flat-square)
![Microsoft Foundry Toolkit](https://img.shields.io/badge/Microsoft_Foundry_Toolkit-Required-orange?style=flat-square)
![Python](https://img.shields.io/badge/Python-3.10+-green?style=flat-square)
![MCP SDK](https://img.shields.io/badge/MCP_SDK-1.9.3-purple?style=flat-square)
![Inspector](https://img.shields.io/badge/MCP_Inspector-0.14.0-blue?style=flat-square)

## 🎯 Tanulási célok

A labor végére képes leszel:

- ✅ Egyéni MCP szervereket létrehozni a Microsoft Foundry Toolkit segítségével
- ✅ Konfigurálni és használni a legújabb MCP Python SDK-t (v1.9.3)
- ✅ Beállítani és használni az MCP Inspectort hibakereséshez
- ✅ Hibakeresni MCP szervereket az Agent Builder és az Inspector környezetekben
- ✅ Megérteni a fejlett MCP szerverfejlesztési munkafolyamatokat

## 📋 Előfeltételek

- A 2. labor (MCP Alapok) elvégzése
- VS Code a Microsoft Foundry Toolkit bővítményével telepítve
- Python 3.10+ környezet
- Node.js és npm az Inspector telepítéséhez

## 🏗️ Amit építeni fogsz

Ebben a laborban egy **Weather MCP szervert** hozol létre, amely bemutatja:
- Egyéni MCP szerver megvalósítását
- Integrációt a Microsoft Foundry Toolkit Agent Builderrel
- Professzionális hibakeresési munkafolyamatokat
- Modern MCP SDK használati mintákat

---

## 🔧 Alapvető komponensek áttekintése

### 🐍 MCP Python SDK
A Model Context Protocol Python SDK biztosítja a alapot egyéni MCP szerverek építéséhez. A 1.9.3-as verziót használjuk kibővített hibakeresési képességekkel.

### 🔍 MCP Inspector
Egy erőteljes hibakereső eszköz, amely:
- Valós idejű szerver monitoringot kínál
- Eszközök futtatásának vizualizációját biztosítja
- Hálózati kérés/válasz vizsgálatot tesz lehetővé
- Interaktív tesztelési környezetet nyújt

---

## 📖 Lépésről lépésre megvalósítás

### 1. lépés: WeatherAgent létrehozása az Agent Builderben

1. **Indítsd el az Agent Buildert** VS Code-ban a Microsoft Foundry Toolkit kiegészítőn keresztül
2. **Hozz létre egy új agent-et** a következő beállítással:
   - Agent név: `WeatherAgent`

![Agent Creation](../../../../translated_images/hu/Agent.c9c33f6a412b4cde.webp)

### 2. lépés: MCP szerver projekt inicializálása

1. **Navigálj a Tools → Add Tool menüponthoz** az Agent Builderben
2. **Válaszd az "MCP Server" lehetőséget**
3. **Válaszd a "Create A new MCP Server" opciót**
4. **Válaszd ki a `python-weather` sablont**
5. **Nevezd el a szervered:** `weather_mcp`

![Python Template Selection](../../../../translated_images/hu/Pythontemplate.9d0a2913c6491500.webp)

### 3. lépés: Nyisd meg és vizsgáld meg a projektet

1. **Nyisd meg a generált projektet** VS Code-ban
2. **Nézd át a projektszerkezetet:**
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

### 4. lépés: Frissítés a legújabb MCP SDK-ra

> **🔍 Miért frissítsünk?** Használni szeretnénk a legújabb MCP SDK-t (v1.9.3) és az Inspector szolgáltatást (0.14.0), hogy jobb funkciókat és hatékonyabb hibakeresést biztosítsunk.

#### 4a. Python függőségek frissítése

**Szerkeszd a `pyproject.toml` fájlt:** frissítsd a [./code/weather_mcp/pyproject.toml](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/pyproject.toml) fájlt

#### 4b. Inspector konfiguráció frissítése

**Szerkeszd az `inspector/package.json` fájlt:** frissítsd a [./code/weather_mcp/inspector/package.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package.json) fájlt

#### 4c. Inspector függőségek frissítése

**Szerkeszd az `inspector/package-lock.json` fájlt:** frissítsd a [./code/weather_mcp/inspector/package-lock.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package-lock.json) fájlt

> **📝 Megjegyzés:** Ez a fájl részletes függőségi meghatározásokat tartalmaz. Lentebb az alapvető szerkezet látható - a teljes tartalom biztosítja a megfelelő függőségfeloldást.

> **⚡ Teljes package-lock:** A teljes package-lock.json kb. 3000 sort tartalmaz a függőségek definícióiból. A fentiek a kulcsszerkezetet mutatják - a teljes feloldáshoz használd a mellékelt fájlt.

### 5. lépés: VS Code hibakeresési konfiguráció beállítása

*Megjegyzés: Kérjük, a megadott helyen található fájlt másold át a helyi megfelelőjére*

#### 5a. Indítási konfiguráció frissítése

**Szerkeszd a `.vscode/launch.json` fájlt:**

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

**Szerkeszd a `.vscode/tasks.json` fájlt:**

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

## 🚀 MCP szerver futtatása és tesztelése

### 6. lépés: Függőségek telepítése

A konfigurációs módosítások elvégzése után futtasd az alábbi parancsokat:

**Python függőségek telepítése:**
```bash
uv sync
```

**Inspector függőségek telepítése:**
```bash
cd inspector
npm install
```

### 7. lépés: Hibakeresés az Agent Builderben

1. **Nyomd meg az F5-öt** vagy használd a **"Debug in Agent Builder"** konfigurációt
2. **Válaszd ki a compound konfigurációt** a hibakereső panelen
3. **Várj, amíg elindul a szerver és megnyílik az Agent Builder**
4. **Teszteld az időjárás MCP szerveredet természetes nyelvű lekérdezésekkel**

Írj be például ilyet

SYSTEM_PROMPT

```
You are my weather assistant
```

USER_PROMPT

```
How's the weather like in Seattle
```

![Agent Builder Debug Result](../../../../translated_images/hu/Result.6ac570f7d2b1d538.webp)

### 8. lépés: Hibakeresés az MCP Inspectorral

1. **Használd a "Debug in Inspector" konfigurációt** (Edge vagy Chrome böngészővel)
2. **Nyisd meg az Inspector felületét** a `http://localhost:6274` címen
3. **Fedezd fel az interaktív tesztelési környezetet:**
   - Nézd meg az elérhető eszközöket
   - Teszteld az eszközök futtatását
   - Kövesd figyelemmel a hálózati kéréseket
   - Hibakeresd a szerver válaszait

![MCP Inspector Interface](../../../../translated_images/hu/Inspector.5672415cd02fe873.webp)

---

## 🎯 Főbb tanult eredmények

A labor elvégzésével:

- [x] **Egyéni MCP szervert hoztál létre** a Microsoft Foundry Toolkit sablonjaival
- [x] **Frissítettél a legújabb MCP SDK verzióra** (v1.9.3) a jobb működés érdekében
- [x] **Beállítottál professzionális hibakeresési munkafolyamatokat** az Agent Builder és az Inspector esetében egyaránt
- [x] **Telepítetted és konfiguráltad az MCP Inspectort** az interaktív szerverteszteléshez
- [x] **Elsajátítottad a VS Code hibakeresési konfigurációinak kezelését** az MCP fejlesztéshez

## 🔧 Feltárt fejlett funkciók

| Funkció | Leírás | Használati eset |
|---------|-------------|----------|
| **MCP Python SDK v1.9.3** | Legújabb protokoll implementáció | Modern szerverfejlesztés |
| **MCP Inspector 0.14.0** | Interaktív hibakereső eszköz | Valós idejű szervertesztelés |
| **VS Code hibakeresés** | Integrált fejlesztői környezet | Professzionális hibakeresési munkafolyamat |
| **Agent Builder integráció** | Közvetlen Microsoft Foundry Toolkit kapcsolat | Végeredmény-ig terjedő agent tesztelés |

## 📚 További források

- [MCP Python SDK dokumentáció](https://modelcontextprotocol.io/docs/sdk/python)
- [Microsoft Foundry Toolkit bővítmény útmutató](https://code.visualstudio.com/docs/ai/ai-toolkit)
- [VS Code hibakeresési dokumentáció](https://code.visualstudio.com/docs/editor/debugging)
- [Model Context Protocol specifikáció](https://modelcontextprotocol.io/docs/concepts/architecture)

---

**🎉 Gratulálunk!** Sikeresen befejezted a 3. laboratóriumot, mostantól képes vagy egyéni MCP szervereket létrehozni, hibakeresni és telepíteni professzionális fejlesztési munkafolyamatokkal.

### 🔜 Haladj a következő modulra

Készen állsz, hogy az MCP képességeidet valós fejlesztési munkafolyamatban is alkalmazd? Folytasd a **[4. modul: Gyakorlati MCP fejlesztés – Egyéni GitHub Clone szerver](../lab4/README.md)** modullal, ahol:
- Egy gyártásra kész MCP szervert építesz, amely automatizálja a GitHub tárhely műveleteit
- Megvalósítod a GitHub tárhely klónozását MCP-n keresztül
- Integrálod az egyéni MCP szervereket VS Code és GitHub Copilot Agent Mode használatával
- Teszteled és élesben telepíted az egyéni MCP szervereket
- Gyakorlati munkafolyamat-automatizálást tanulsz fejlesztők számára

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ez a dokumentum az AI fordítási szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Fontos információk esetén professzionális emberi fordítást javasolunk. Nem vállalunk felelősséget semmilyen félreértésért vagy téves értelmezésért, amely ebből a fordításból ered.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->