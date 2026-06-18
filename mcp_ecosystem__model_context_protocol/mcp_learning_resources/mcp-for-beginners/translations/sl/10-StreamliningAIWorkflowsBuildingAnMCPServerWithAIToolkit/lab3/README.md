# 🔧 Modul 3: Napredni razvoj MCP z Microsoft Foundry Toolkit

![Duration](https://img.shields.io/badge/Duration-20_minutes-blue?style=flat-square)
![Microsoft Foundry Toolkit](https://img.shields.io/badge/Microsoft_Foundry_Toolkit-Required-orange?style=flat-square)
![Python](https://img.shields.io/badge/Python-3.10+-green?style=flat-square)
![MCP SDK](https://img.shields.io/badge/MCP_SDK-1.9.3-purple?style=flat-square)
![Inspector](https://img.shields.io/badge/MCP_Inspector-0.14.0-blue?style=flat-square)

## 🎯 Cilji učenja

Do konca te delavnice boste lahko:

- ✅ Ustvarili prilagojene MCP strežnike z uporabo Microsoft Foundry Toolkit
- ✅ Konfigurirali in uporabljali najnovejši MCP Python SDK (v1.9.3)
- ✅ Nastavili in uporabljali MCP Inspector za razhroščevanje
- ✅ Razhroščevali MCP strežnike v okoljih Agent Builder in Inspector
- ✅ Razumeli napredne delovne procese razvoja MCP strežnikov

## 📋 Predpogoji

- Dokončanje Laboratorija 2 (MCP Osnove)
- VS Code z nameščeno razširitvijo Microsoft Foundry Toolkit
- Okolje Python 3.10+
- Node.js in npm za nastavitev Inspectorja

## 🏗️ Kaj boste ustvarili

V tej delavnici boste ustvarili **Weather MCP strežnik**, ki prikazuje:
- Implementacijo prilagojenega MCP strežnika
- Integracijo z Microsoft Foundry Toolkit Agent Builder
- Profesionalne delovne procese razhroščevanja
- Sodobne vzorce uporabe MCP SDK

---

## 🔧 Pregled glavnih komponent

### 🐍 MCP Python SDK
Model Context Protocol Python SDK zagotavlja temelje za izdelavo prilagojenih MCP strežnikov. Uporabili boste različico 1.9.3 z izboljšanimi možnostmi razhroščevanja.

### 🔍 MCP Inspector
Zmogočno orodje za razhroščevanje, ki omogoča:
- Spremljanje strežnika v realnem času
- Vizualizacijo izvajanja orodij
- Pregled omrežnih zahtevkov/odgovorov
- Interaktivno testno okolje

---

## 📖 Korak za korakom implementacija

### Korak 1: Ustvarite WeatherAgent v Agent Builderju

1. **Zaženite Agent Builder** v VS Code prek razširitve Microsoft Foundry Toolkit
2. **Ustvarite novega agenta** z naslednjo konfiguracijo:
   - Ime agenta: `WeatherAgent`

![Agent Creation](../../../../translated_images/sl/Agent.c9c33f6a412b4cde.webp)

### Korak 2: Inicializacija MCP strežniškega projekta

1. **Pojdite na Orodja** → **Dodaj orodje** v Agent Builderju
2. **Izberite "MCP Server"** med razpoložljivimi možnostmi
3. **Izberite "Ustvari nov MCP strežnik"**
4. **Izberite predlogo `python-weather`**
5. **Poimenujte strežnik:** `weather_mcp`

![Python Template Selection](../../../../translated_images/sl/Pythontemplate.9d0a2913c6491500.webp)

### Korak 3: Odprite in preglejte projekt

1. **Odprite ustvarjeni projekt** v VS Code
2. **Preglejte strukturo projekta:**
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

### Korak 4: Nadgradnja na najnovejši MCP SDK

> **🔍 Zakaj nadgraditi?** Želimo uporabiti najnovejši MCP SDK (v1.9.3) in Inspector storitev (0.14.0) za izboljšane funkcije in boljše možnosti razhroščevanja.

#### 4a. Posodobitev Python odvisnosti

**Uredite `pyproject.toml`:** posodobite [./code/weather_mcp/pyproject.toml](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/pyproject.toml)


#### 4b. Posodobitev konfiguracije Inspectorja

**Uredite `inspector/package.json`:** posodobite [./code/weather_mcp/inspector/package.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package.json)

#### 4c. Posodobitev odvisnosti Inspectorja

**Uredite `inspector/package-lock.json`:** posodobite [./code/weather_mcp/inspector/package-lock.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package-lock.json)

> **📝 Opomba:** Ta datoteka vsebuje obsežne definicije odvisnosti. Spodaj je ključna struktura - celotna vsebina zagotavlja pravilno rešitev odvisnosti.


> **⚡ Celoten Package Lock:** Celoten package-lock.json vsebuje ~3000 vrstic definicij odvisnosti. Zgornji prikaz prikazuje osnovno strukturo - uporabite priloženo datoteko za popolno rešitev odvisnosti.

### Korak 5: Konfiguracija razhroščevanja v VS Code

*Opomba: Prosim, skopirajte datoteko na navedeni poti, da zamenjate ustrezno lokalno datoteko*

#### 5a. Posodobitev zagonske konfiguracije

**Uredite `.vscode/launch.json`:**

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

**Uredite `.vscode/tasks.json`:**

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

## 🚀 Zagon in testiranje vašega MCP strežnika

### Korak 6: Namestitev odvisnosti

Po izvedbi konfiguracijskih sprememb zaženite naslednje ukaze:

**Namestite Python odvisnosti:**
```bash
uv sync
```

**Namestite Inspector odvisnosti:**
```bash
cd inspector
npm install
```

### Korak 7: Razhroščevanje z Agent Builderjem

1. **Pritisnite F5** ali uporabite konfiguracijo **"Debug in Agent Builder"**
2. **Izberite združeno konfiguracijo** v razhroščevalnem delu
3. **Počakajte, da se strežnik zažene** in odpre Agent Builder
4. **Preizkusite svoj strežnik weather MCP** z naravnimi jezikovnimi vprašanji

Vnesite poziv, kot je ta

SYSTEM_PROMPT

```
You are my weather assistant
```

USER_PROMPT

```
How's the weather like in Seattle
```

![Agent Builder Debug Result](../../../../translated_images/sl/Result.6ac570f7d2b1d538.webp)

### Korak 8: Razhroščevanje z MCP Inspectorjem

1. **Uporabite konfiguracijo "Debug in Inspector"** (Edge ali Chrome)
2. **Odprite vmesnik Inspectorja** na `http://localhost:6274`
3. **Raziskujte interaktivno testno okolje:**
   - Preglejte razpoložljiva orodja
   - Preizkusite izvajanje orodij
   - Spremljajte omrežne zahtevke
   - Razhroščujte odgovore strežnika

![MCP Inspector Interface](../../../../translated_images/sl/Inspector.5672415cd02fe873.webp)

---

## 🎯 Ključni rezultati učenja

Z dokončanjem te delavnice ste:

- [x] **Ustvarili prilagojen MCP strežnik** z uporabo predlog Microsoft Foundry Toolkit
- [x] **Nadgradili na najnovejši MCP SDK** (v1.9.3) za izboljšano funkcionalnost
- [x] **Konfigurirali profesionalne delovne procese razhroščevanja** za Agent Builder in Inspector
- [x] **Nastavili MCP Inspector** za interaktivno testiranje strežnika
- [x] **Obvladali konfiguracije razhroščevanja v VS Code** za razvoj MCP

## 🔧 Raziskane napredne funkcije

| Funkcija | Opis | Uporabni primer |
|---------|-------------|----------|
| **MCP Python SDK v1.9.3** | Najnovejša implementacija protokola | Sodobni razvoj strežnika |
| **MCP Inspector 0.14.0** | Interaktivno orodje za razhroščevanje | Testiranje strežnika v realnem času |
| **Razhroščevanje v VS Code** | Integrirano razvojno okolje | Profesionalen delovni proces razhroščevanja |
| **Integracija Agent Builderja** | Neposredna povezava z Microsoft Foundry Toolkit | Celovito testiranje agentov |

## 📚 Dodatni viri

- [MCP Python SDK Dokumentacija](https://modelcontextprotocol.io/docs/sdk/python)
- [Vodnik za Microsoft Foundry Toolkit razširitev](https://code.visualstudio.com/docs/ai/ai-toolkit)
- [Dokumentacija razhroščevanja za VS Code](https://code.visualstudio.com/docs/editor/debugging)
- [Specifikacija Model Context Protocol](https://modelcontextprotocol.io/docs/concepts/architecture)

---

**🎉 Čestitamo!** Uspešno ste zaključili Laboratorij 3 in zdaj lahko ustvarjate, razhroščujete in nameščate prilagojene MCP strežnike s profesionalnimi delovnimi procesi razvoja.

### 🔜 Nadaljujte v naslednji modul

Ste pripravljeni uporabiti svoje MCP veščine v realnem razvojnem procesu? Nadaljujte z **[Modul 4: Praktični razvoj MCP - prilagojen GitHub klon strežnik](../lab4/README.md)**, kjer boste:
- Zgradili produkcijsko pripravljen MCP strežnik, ki avtomatizira GitHub repozitorijske operacije
- Implementirali funkcionalnost kloniranja GitHub repozitorija preko MCP
- Integrirali prilagojene MCP strežnike z VS Code in GitHub Copilot Agent Mode
- Testirali in nameščali prilagojene MCP strežnike v produkcijska okolja
- Naučili se praktične avtomatizacije delovnih procesov za razvijalce

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Omejitev odgovornosti**:
Ta dokument je bil preveden z uporabo AI prevajalske storitve [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, vas prosimo, da upoštevate, da avtomatizirani prevodi lahko vsebujejo napake ali netočnosti. Izvirni dokument v njegovem izvirnem jeziku je treba obravnavati kot avtoritativni vir. Za kritične informacije je priporočljiv strokovni človeški prevod. Ne odgovarjamo za morebitna nesporazume ali napačne interpretacije, ki izhajajo iz uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->