# 🔧 Moodul 3: Täiustatud MCP arendus Microsoft Foundry Toolkitiga

![Duration](https://img.shields.io/badge/Duration-20_minutes-blue?style=flat-square)
![Microsoft Foundry Toolkit](https://img.shields.io/badge/Microsoft_Foundry_Toolkit-Required-orange?style=flat-square)
![Python](https://img.shields.io/badge/Python-3.10+-green?style=flat-square)
![MCP SDK](https://img.shields.io/badge/MCP_SDK-1.9.3-purple?style=flat-square)
![Inspector](https://img.shields.io/badge/MCP_Inspector-0.14.0-blue?style=flat-square)

## 🎯 Õpieesmärgid

Selle labori lõpuks oskad:

- ✅ Luua kohandatud MCP servereid Microsoft Foundry Toolkitiga
- ✅ Konfigureerida ja kasutada uusimat MCP Python SDK-d (v1.9.3)
- ✅ Seadistada ja kasutada MCP Inspectorit silumiseks
- ✅ Siluda MCP servereid nii Agent Builderi kui ka Inspector keskkondades
- ✅ Mõista täiustatud MCP serveri arendusvooge

## 📋 Eeltingimused

- Labori 2 (MCP põhitõed) lõpetamine
- VS Code koos Microsoft Foundry Toolkit laiendusega
- Python 3.10+ keskkond
- Node.js ja npm Inspector seadistamiseks

## 🏗️ Mida sa ehitad

Selles laboris lood **Ilma MCP serveri**, mis demonstreerib:
- Kohandatud MCP serveri rakendust
- Integratsiooni Microsoft Foundry Toolkit Agent Builderiga
- Professionaalseid silumisvooge
- Moodsaid MCP SDK kasutusmustreid

---

## 🔧 Põhikomponentide ülevaade

### 🐍 MCP Python SDK
Model Context Protocol Python SDK pakub vundamenti kohandatud MCP serverite ehitamiseks. Kasutad versiooni 1.9.3 koos täiustatud silumisvõimalustega.

### 🔍 MCP Inspector
Võimas silumistööriist, mis pakub:
- Reaalajas serveri jälgimist
- Tööriistade täitmise visualiseerimist
- Võrgu päringute/vastuste kontrolli
- Interaktiivne testimise keskkond

---

## 📖 Samm-sammult rakendamine

### Samm 1: Loo WeatherAgent Agent Builderis

1. **Lauka Agent Builder** VS Code’is Microsoft Foundry Toolkit laienduse kaudu
2. **Loo uus agent** järgmiste seadistustega:
   - Agent Nimi: `WeatherAgent`

![Agent Creation](../../../../translated_images/et/Agent.c9c33f6a412b4cde.webp)

### Samm 2: Algata MCP Serveri Projekt

1. **Mine menüüsse Tools** → **Add Tool** Agent Builderis
2. **Vali "MCP Server"** saadaval olevate valikute seast
3. **Vali "Create A new MCP Server"**
4. **Vali `python-weather` mall**
5. **Nimeta oma server:** `weather_mcp`

![Python Template Selection](../../../../translated_images/et/Pythontemplate.9d0a2913c6491500.webp)

### Samm 3: Ava ja vaata projekti

1. **Ava loodud projekt** VS Code’is
2. **Kontrolli projekti struktuuri:**
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

### Samm 4: Uuenda uusimale MCP SDK-le

> **🔍 Miks uuendada?** Soovime kasutada uusimat MCP SDK-d (v1.9.3) ja Inspectori teenust (0.14.0), et saada täiendatud funktsioone ja paremat silumist.

#### 4a. Uuenda Python sõltuvusi

**Muuda `pyproject.toml`:** uuenda [./code/weather_mcp/pyproject.toml](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/pyproject.toml)


#### 4b. Uuenda Inspectori konfiguratsiooni

**Muuda `inspector/package.json`:** uuenda [./code/weather_mcp/inspector/package.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package.json)

#### 4c. Uuenda Inspectori sõltuvusi

**Muuda `inspector/package-lock.json`:** uuenda [./code/weather_mcp/inspector/package-lock.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package-lock.json)

> **📝 Märkus:** See fail sisaldab ulatuslikke sõltuvuste definitsioone. Allpool on põhistruktuur – täielik sisu tagab õige sõltuvuste lahenduse.


> **⚡ Täielik Package Lock:** Täielik package-lock.json sisaldab umbes 3000 rida sõltuvuste definitsioone. Ülal on näidatud peamine struktuur – kasuta lisatud faili täielikuks sõltuvuste lahendamiseks.

### Samm 5: Konfigureeri VS Code silumine

*Märkus: Palun kopeeri fail määratud asukohta, et asendada olemasolev kohalik fail*

#### 5a. Uuenda käivituskonfiguratsiooni

**Muuda `.vscode/launch.json`:**

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

**Muuda `.vscode/tasks.json`:**

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

## 🚀 Käivita ja testi oma MCP serverit

### Samm 6: Paigalda sõltuvused

Pärast konfiguratsiooni muudatusi käivita järgnevad käsud:

**Paigalda Python sõltuvused:**
```bash
uv sync
```

**Paigalda Inspectori sõltuvused:**
```bash
cd inspector
npm install
```

### Samm 7: Silu Agent Builderiga

1. **Vajuta F5** või kasuta **"Debug in Agent Builder"** konfiguratsiooni
2. **Vali kogumkonfiguratsioon** silumispaneelist
3. **Oota, kuni server käivitub** ja Agent Builder avaneb
4. **Testi oma ilma MCP serverit** loomulike keelepäringutega

Sisendi prompt näeb välja selline

SYSTEM_PROMPT

```
You are my weather assistant
```

USER_PROMPT

```
How's the weather like in Seattle
```

![Agent Builder Debug Result](../../../../translated_images/et/Result.6ac570f7d2b1d538.webp)

### Samm 8: Silu MCP Inspectoriga

1. **Kasuta "Debug in Inspector"** konfiguratsiooni (Edge või Chrome)
2. **Ava Inspectori liides aadressil** `http://localhost:6274`
3. **Uuri interaktiivset testimise keskkonda:**
   - Vaata saadaval olevaid tööriistu
   - Testi tööriistade täitmist
   - Jälgi võrgupäringuid
   - Silu serveri vastuseid

![MCP Inspector Interface](../../../../translated_images/et/Inspector.5672415cd02fe873.webp)

---

## 🎯 Peamised õpitulemused

Selle labori lõpetamisega oled:

- [x] **Loonud kohandatud MCP serveri** Microsoft Foundry Toolkit mallide abil
- [x] **Uuendanud uusimale MCP SDK-le** (v1.9.3) paremate funktsioonide jaoks
- [x] **Konfigureerinud professionaalsed silumisvood** nii Agent Builderis kui Inspectoris
- [x] **Seadistanud MCP Inspectori** interaktiivseks serveri testimiseks
- [x] **Valdanud VS Code silumisconfiguratsioone** MCP arenduse jaoks

## 🔧 Läbitud täiustatud funktsioonid

| Funktsioon | Kirjeldus | Kasutusjuhtum |
|---------|-------------|----------|
| **MCP Python SDK v1.9.3** | Viimane protokollirakendus | Moodne serveriarendus |
| **MCP Inspector 0.14.0** | Interaktiivne silumistööriist | Reaalajas serveri testimine |
| **VS Code Debugging** | Integreeritud arenduskeskkond | Professionaalne silumisvoog |
| **Agent Builderi integratsioon** | Otsene Microsoft Foundry Toolkit ühendus | Lõppkasutaja agendi testimine |

## 📚 Täiendavad ressursid

- [MCP Python SDK dokumentatsioon](https://modelcontextprotocol.io/docs/sdk/python)
- [Microsoft Foundry Toolkit laienduse juhend](https://code.visualstudio.com/docs/ai/ai-toolkit)
- [VS Code silumisjuhend](https://code.visualstudio.com/docs/editor/debugging)
- [Model Context Protocol spetsifikatsioon](https://modelcontextprotocol.io/docs/concepts/architecture)

---

**🎉 Palju õnne!** Sa lõpetasid edukalt Labor 3 ja oskad nüüd luua, siluda ning juurutada kohandatud MCP servereid professionaalsete arendusvoogude abil.

### 🔜 Jätka järgmise mooduliga

Kas oled valmis rakendama oma MCP oskusi pärismaailma arendusvoos? Jätka **[Moodul 4: Praktiline MCP arendus - Kohandatud GitHub klooniserv](../lab4/README.md)**, kus:
- Ehitate tootmisvalmis MCP serveri, mis automatiseerib GitHub repositooriumi toiminguid
- Rakendad GitHub repositooriumite kloonimise funktsionaalsust MCP kaudu
- Integreerid kohandatud MCP serverid VS Code’i ja GitHub Copilot Agent Mode’iga
- Testid ja juurutad kohandatud MCP servereid tootmiskeskkondades
- Õpid praktilisi arendusprotsesside automatiseerimise töövooge arendajatele

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Lahtiütlus**:
See dokument on tõlgitud kasutades AI tõlketeenust [Co-op Translator](https://github.com/Azure/co-op-translator). Kuigi me püüdleme täpsuse poole, palun pange tähele, et automatiseeritud tõlgetes võib esineda vigu või ebatäpsusi. Originaaldokument selle emakeeles tuleks pidada autoriteetseks allikaks. Olulise teabe puhul soovitatakse kasutada professionaalset inimtõlget. Me ei vastuta selle tõlkega seotud eksimustest või valesti mõistmistest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->