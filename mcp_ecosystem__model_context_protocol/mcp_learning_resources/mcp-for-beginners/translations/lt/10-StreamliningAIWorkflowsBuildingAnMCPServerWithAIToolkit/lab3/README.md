# 🔧 3 modulis: Išplėstinė MCP kūrimas naudojant Microsoft Foundry Toolkit

![Trukmė](https://img.shields.io/badge/Duration-20_minutes-blue?style=flat-square)
![Microsoft Foundry Toolkit](https://img.shields.io/badge/Microsoft_Foundry_Toolkit-Required-orange?style=flat-square)
![Python](https://img.shields.io/badge/Python-3.10+-green?style=flat-square)
![MCP SDK](https://img.shields.io/badge/MCP_SDK-1.9.3-purple?style=flat-square)
![Inspector](https://img.shields.io/badge/MCP_Inspector-0.14.0-blue?style=flat-square)

## 🎯 Mokymosi tikslai

Šio laboratorinio darbo pabaigoje jūs sugebėsite:

- ✅ Kurti pasirinktinius MCP serverius naudojant Microsoft Foundry Toolkit
- ✅ Konfigūruoti ir naudoti naujausią MCP Python SDK (v1.9.3)
- ✅ Įdiegti ir naudoti MCP Inspector derinimui
- ✅ Derinti MCP serverius tiek Agent Builder, tiek Inspector aplinkose
- ✅ Suprasti pažangius MCP serverio kūrimo darbo srautus

## 📋 Reikalavimai

- Baigtas 2 laboratorinis darbas (MCP pagrindai)
- Įdiegta VS Code su Microsoft Foundry Toolkit plėtiniu
- Python 3.10+ aplinka
- Node.js ir npm Inspector diegimui

## 🏗️ Ką kursite

Šiame darbe sukursite **Weather MCP Server** serverį, kuris demonstruoja:
- Pasirinktinio MCP serverio įgyvendinimą
- Integraciją su Microsoft Foundry Toolkit Agent Builder
- Profesionalius derinimo darbo srautus
- Modernius MCP SDK naudojimo modelius

---

## 🔧 Pagrindinių komponentų apžvalga

### 🐍 MCP Python SDK
Modelio konteksto protokolo Python SDK suteikia pagrindą kuriant pasirinktinius MCP serverius. Naudosite versiją 1.9.3 su patobulintomis derinimo galimybėmis.

### 🔍 MCP Inspector
Galingas derinimo įrankis, kuris suteikia:
- Realaus laiko serverio stebėjimą
- Įrankių vykdymo vizualizaciją
- Tinklo užklausų/atsakymų tikrinimą
- Interaktyvią testavimo aplinką

---

## 📖 Įgyvendinimo žingsnis po žingsnio

### 1 žingsnis: Sukurkite WeatherAgent Agent Builder

1. **Paleiskite Agent Builder** VS Code per Microsoft Foundry Toolkit plėtinį
2. **Sukurkite naują agentą** su tokiomis konfigūracijomis:
   - Agentas pavadinimas: `WeatherAgent`

![Agento kūrimas](../../../../translated_images/lt/Agent.c9c33f6a412b4cde.webp)

### 2 žingsnis: Inicijuokite MCP serverio projektą

1. **Eikite į Įrankiai** → **Pridėti įrankį** Agent Builder
2. **Pasirinkite "MCP Server"** iš pasiūlytų variantų
3. **Pasirinkite "Sukurti naują MCP serverį"**
4. **Pasirinkite `python-weather` šabloną**
5. **Pavadinkite savo serverį:** `weather_mcp`

![Python šablono pasirinkimas](../../../../translated_images/lt/Pythontemplate.9d0a2913c6491500.webp)

### 3 žingsnis: Atidarykite ir apžvelkite projektą

1. **Atidarykite sukurtą projektą** VS Code
2. **Peržiūrėkite projekto struktūrą:**
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

### 4 žingsnis: Atnaujinkite į naujausią MCP SDK

> **🔍 Kodėl atnaujinti?** Norime naudoti naujausią MCP SDK (v1.9.3) ir Inspector paslaugą (0.14.0) dėl patobulintų funkcijų ir geresnių derinimo galimybių.

#### 4a. Atnaujinkite Python priklausomybes

**Redaguokite `pyproject.toml`:** atnaujinkite [./code/weather_mcp/pyproject.toml](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/pyproject.toml)


#### 4b. Atnaujinkite Inspector konfigūraciją

**Redaguokite `inspector/package.json`:** atnaujinkite [./code/weather_mcp/inspector/package.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package.json)

#### 4c. Atnaujinkite Inspector priklausomybes

**Redaguokite `inspector/package-lock.json`:** atnaujinkite [./code/weather_mcp/inspector/package-lock.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package-lock.json)

> **📝 Pastaba:** Šis failas apima plataus masto priklausomybių apibrėžimus. Žemiau pateikiama pagrindinė struktūra – pilnas turinys užtikrina tinkamą priklausomybių sprendimą.


> **⚡ Pilnas Package Lock:** Pilnas package-lock.json failas apima apie 3000 eilučių priklausomybių apibrėžimų. Aukščiau pateikta pagrindinė struktūra – naudokite pateiktą failą pilnam sprendimui.

### 5 žingsnis: Konfigūruokite VS Code derinimą

*Pastaba: Nukopijuokite failą nurodytoje vietoje, kad pakeistumėte atitinkamą vietinį failą*

#### 5a. Atnaujinkite paleidimo konfigūraciją

**Redaguokite `.vscode/launch.json`:**

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

**Redaguokite `.vscode/tasks.json`:**

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

## 🚀 Paleidimas ir testavimas jūsų MCP serveryje

### 6 žingsnis: Įdiekite priklausomybes

Padarius konfigūracijos pakeitimus, vykdykite šias komandas:

**Įdiekite Python priklausomybes:**
```bash
uv sync
```

**Įdiekite Inspector priklausomybes:**
```bash
cd inspector
npm install
```

### 7 žingsnis: Derinkite Agent Builder

1. **Paspauskite F5** arba naudokite **"Derinti Agent Builder"** konfigūraciją
2. **Pasirinkite compound konfigūraciją** derinimo lange
3. **Palaukite, kol serveris užsikraus** ir atsidarys Agent Builder
4. **Išbandykite savo Weather MCP serverį** natūralios kalbos užklausomis

Įveskite užklausą panašią į šią

SYSTEM_PROMPT

```
You are my weather assistant
```

USER_PROMPT

```
How's the weather like in Seattle
```

![Agent Builder Derinimo Rezultatas](../../../../translated_images/lt/Result.6ac570f7d2b1d538.webp)

### 8 žingsnis: Derinkite su MCP Inspector

1. **Naudokite "Derinti Inspectoriuje"** konfigūraciją (Edge arba Chrome)
2. **Atidarykite Inspector sąsają** adresu `http://localhost:6274`
3. **Išnagrinėkite interaktyvią testavimo aplinką:**
   - Peržiūrėkite prieinamus įrankius
   - Išbandykite įrankių vykdymą
   - Stebėkite tinklo užklausas
   - Derinkite serverio atsakymus

![MCP Inspector Sąsaja](../../../../translated_images/lt/Inspector.5672415cd02fe873.webp)

---

## 🎯 Pagrindiniai įgyti įgūdžiai

Užbaigę šį laboratorinį darbą jūs:

- [x] **Sukūrėte pasirinktinius MCP serverius** naudojant Microsoft Foundry Toolkit šablonus
- [x] **Atnaujinote į naujausią MCP SDK** (v1.9.3) dėl papildomų funkcijų
- [x] **Konfigūravote profesionalius derinimo darbo srautus** tiek Agent Builder, tiek Inspector
- [x] **Įdiegėte MCP Inspector** interaktyviam serverio testavimui
- [x] **Išmokote VS Code derinimo konfigūracijų** MCP kūrimui

## 🔧 Išplėstiniai nagrinėti funkcionalumai

| Funkcija | Aprašymas | Panaudojimas |
|---------|-------------|----------|
| **MCP Python SDK v1.9.3** | Naujausia protokolo įgyvendinimo versija | Modernus serverio kūrimas |
| **MCP Inspector 0.14.0** | Interaktyvus derinimo įrankis | Realaus laiko serverio testavimas |
| **VS Code derinimas** | Integruota kūrimo aplinka | Profesionalus derinimo darbo srautas |
| **Agent Builder integracija** | Tiesioginė Microsoft Foundry Toolkit jungtis | Pilnas agento testavimas |

## 📚 Papildomi ištekliai

- [MCP Python SDK dokumentacija](https://modelcontextprotocol.io/docs/sdk/python)
- [Microsoft Foundry Toolkit plėtinio gidas](https://code.visualstudio.com/docs/ai/ai-toolkit)
- [VS Code derinimo dokumentacija](https://code.visualstudio.com/docs/editor/debugging)
- [Modelio konteksto protokolo specifikacija](https://modelcontextprotocol.io/docs/concepts/architecture)

---

**🎉 Sveikiname!** Sėkmingai įveikėte 3 laboratorinį darbą ir dabar galite kurti, derinti bei diegti pasirinktinius MCP serverius naudojant profesionalius kūrimo darbo srautus.

### 🔜 Tęskite į kitą modulį

Pasiruošę pritaikyti savo MCP įgūdžius realaus pasaulio kūrimo darbo sraute? Tęskite į **[4 modulį: Praktinis MCP kūrimas – pasirinktinis GitHub klonavimo serveris](../lab4/README.md)**, kuriame jūs:
- Kursite gamybai paruoštą MCP serverį, automatizuojantį GitHub saugyklos veiksmus
- Įgyvendinsite GitHub saugyklos klonavimo funkcionalumą per MCP
- Integruosite pasirinktinius MCP serverius su VS Code ir GitHub Copilot agento režimu
- Testuosite ir diegsite pasirinktinius MCP serverius gamybos aplinkose
- Išmoksite praktinio darbo srauto automatizavimo kūrėjams

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors siekiame tikslumo, prašome atkreipti dėmesį, kad automatiniai vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas jo gimtąja kalba laikomas autoritetingu šaltiniu. Svarbiai informacijai rekomenduojama naudoti profesionalų žmogiškąjį vertimą. Mes neatsakome už jokius nesusipratimus ar neteisingą interpretaciją, kilusią naudojantis šiuo vertimu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->