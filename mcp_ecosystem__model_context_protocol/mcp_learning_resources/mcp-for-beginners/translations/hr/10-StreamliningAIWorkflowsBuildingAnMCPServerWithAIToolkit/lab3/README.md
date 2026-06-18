# 🔧 Modul 3: Napredni razvoj MCP-a s Microsoft Foundry Toolkitom

![Duration](https://img.shields.io/badge/Duration-20_minutes-blue?style=flat-square)
![Microsoft Foundry Toolkit](https://img.shields.io/badge/Microsoft_Foundry_Toolkit-Required-orange?style=flat-square)
![Python](https://img.shields.io/badge/Python-3.10+-green?style=flat-square)
![MCP SDK](https://img.shields.io/badge/MCP_SDK-1.9.3-purple?style=flat-square)
![Inspector](https://img.shields.io/badge/MCP_Inspector-0.14.0-blue?style=flat-square)

## 🎯 Ciljevi učenja

Do kraja ovog laboratorija moći ćete:

- ✅ Kreirati prilagođene MCP poslužitelje koristeći Microsoft Foundry Toolkit
- ✅ Konfigurirati i koristiti najnoviji MCP Python SDK (verzija 1.9.3)
- ✅ Postaviti i koristiti MCP Inspector za ispravljanje pogrešaka
- ✅ Ispravljati pogreške MCP poslužitelja u Agent Builder i Inspector okruženjima
- ✅ Razumjeti napredne radne tokove razvoja MCP poslužitelja

## 📋 Preduvjeti

- Završetak laboratorija 2 (MCP Osnove)
- VS Code s instaliranim Microsoft Foundry Toolkit dodatkom
- Python 3.10+ okruženje
- Node.js i npm za postavljanje Inspectora

## 🏗️ Što ćete izraditi

U ovom laboratoriju izradit ćete **Weather MCP Server** koji demonstrira:
- Prilagođenu implementaciju MCP poslužitelja
- Integraciju s Microsoft Foundry Toolkit Agent Builderom
- Profesionalne radne tokove za ispravljanje pogrešaka
- Moderni obrazac korištenja MCP SDK-a

---

## 🔧 Pregled osnovnih komponenti

### 🐍 MCP Python SDK
Model Context Protocol Python SDK pruža temelj za izgradnju prilagođenih MCP poslužitelja. Koristit ćete verziju 1.9.3 s poboljšanim mogućnostima ispravljanja pogrešaka.

### 🔍 MCP Inspector
Moćan alat za ispravljanje pogrešaka koji pruža:
- Praćenje poslužitelja u stvarnom vremenu
- Vizualizaciju izvršenja alata
- Inspekciju mrežnih zahtjeva/odgovora
- Interaktivno testno okruženje

---

## 📖 Implementacija korak po korak

### Korak 1: Izradite WeatherAgent u Agent Builderu

1. **Pokrenite Agent Builder** u VS Codeu preko Microsoft Foundry Toolkit dodatka
2. **Izradite novog agenta** sa sljedećom konfiguracijom:
   - Ime agenta: `WeatherAgent`

![Agent Creation](../../../../translated_images/hr/Agent.c9c33f6a412b4cde.webp)

### Korak 2: Inicijalizirajte MCP Server projekt

1. **Idite na Tools** → **Add Tool** u Agent Builderu
2. **Odaberite "MCP Server"** iz dostupnih opcija
3. **Odaberite "Create A new MCP Server"**
4. **Izaberite `python-weather` predložak**
5. **Imenujte svoj poslužitelj:** `weather_mcp`

![Python Template Selection](../../../../translated_images/hr/Pythontemplate.9d0a2913c6491500.webp)

### Korak 3: Otvorite i pregledajte projekt

1. **Otvorite generirani projekt** u VS Codeu
2. **Pregledajte strukturu projekta:**
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

### Korak 4: Nadogradite na najnoviji MCP SDK

> **🔍 Zašto nadograditi?** Želimo koristiti najnoviji MCP SDK (verzija 1.9.3) i Inspector servis (0.14.0) za poboljšane značajke i bolje mogućnosti ispravljanja pogrešaka.

#### 4a. Ažurirajte Python ovisnosti

**Uredite `pyproject.toml`:** update [./code/weather_mcp/pyproject.toml](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/pyproject.toml)


#### 4b. Ažurirajte konfiguraciju Inspectora

**Uredite `inspector/package.json`:** update [./code/weather_mcp/inspector/package.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package.json)

#### 4c. Ažurirajte ovisnosti Inspectora

**Uredite `inspector/package-lock.json`:** update [./code/weather_mcp/inspector/package-lock.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package-lock.json)

> **📝 Napomena:** Ova datoteka sadrži opsežne definicije ovisnosti. Dolje je prikazana osnovna struktura - puna sadržaj osigurava pravilno rješavanje ovisnosti.


> **⚡ Potpuni Package Lock:** Kompletni package-lock.json sadrži ~3000 redaka definicija ovisnosti. Gore je prikazana ključna struktura - koristite priloženu datoteku za potpunu rezoluciju ovisnosti.

### Korak 5: Konfigurirajte ispravljanje pogrešaka u VS Codeu

*Napomena: Molimo kopirajte datoteku na naznačenoj lokaciji kako biste zamijenili odgovarajuću lokalnu datoteku*

#### 5a. Ažurirajte Launch konfiguraciju

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

## 🚀 Pokretanje i testiranje MCP poslužitelja

### Korak 6: Instalirajte ovisnosti

Nakon izmjena konfiguracije pokrenite sljedeće naredbe:

**Instalirajte Python ovisnosti:**
```bash
uv sync
```

**Instalirajte Inspector ovisnosti:**
```bash
cd inspector
npm install
```

### Korak 7: Ispravljanje pogrešaka s Agent Builderom

1. **Pritisnite F5** ili upotrijebite konfiguraciju **"Debug in Agent Builder"**
2. **Odaberite složenu konfiguraciju** iz debug panela
3. **Pričekajte da se poslužitelj pokrene** i da se Agent Builder otvori
4. **Testirajte svoj weather MCP poslužitelj** s upitima na prirodnom jeziku

Unesite upit ovako

SYSTEM_PROMPT

```
You are my weather assistant
```

USER_PROMPT

```
How's the weather like in Seattle
```

![Agent Builder Debug Result](../../../../translated_images/hr/Result.6ac570f7d2b1d538.webp)

### Korak 8: Ispravljanje pogrešaka s MCP Inspectorom

1. **Koristite konfiguraciju "Debug in Inspector"** (Edge ili Chrome)
2. **Otvorite Inspector sučelje** na `http://localhost:6274`
3. **Istražite interaktivno testno okruženje:**
   - Pogledajte dostupne alate
   - Testirajte izvršenje alata
   - Pratite mrežne zahtjeve
   - Ispravljajte odgovore poslužitelja

![MCP Inspector Interface](../../../../translated_images/hr/Inspector.5672415cd02fe873.webp)

---

## 🎯 Ključni ishodi učenja

Završetkom ovog laboratorija:

- [x] **Kreirali ste prilagođeni MCP poslužitelj** koristeći Microsoft Foundry Toolkit predloške
- [x] **Nadogradili na najnoviji MCP SDK** (verzija 1.9.3) za poboljšanu funkcionalnost
- [x] **Konfigurirali profesionalne radne tokove ispravljanja pogrešaka** za Agent Builder i Inspector
- [x] **Postavili MCP Inspector** za interaktivno testiranje poslužitelja
- [x] **Ovladali VS Code konfiguracijom ispravljanja pogrešaka** za razvoj MCP-a

## 🔧 Istražene napredne značajke

| Značajka | Opis | Primjer upotrebe |
|---------|-------------|----------|
| **MCP Python SDK v1.9.3** | Najnovija implementacija protokola | Moderan razvoj poslužitelja |
| **MCP Inspector 0.14.0** | Interaktivni alat za ispravljanje pogrešaka | Testiranje poslužitelja u stvarnom vremenu |
| **VS Code Debugging** | Integrirano razvojno okruženje | Profesionalni radni tok ispravljanja pogrešaka |
| **Agent Builder Integracija** | Direktna veza s Microsoft Foundry Toolkitom | Testiranje agenata od početka do kraja |

## 📚 Dodatni resursi

- [MCP Python SDK dokumentacija](https://modelcontextprotocol.io/docs/sdk/python)
- [Microsoft Foundry Toolkit vodič za dodatak](https://code.visualstudio.com/docs/ai/ai-toolkit)
- [VS Code dokumentacija za ispravljanje pogrešaka](https://code.visualstudio.com/docs/editor/debugging)
- [Model Context Protocol specifikacija](https://modelcontextprotocol.io/docs/concepts/architecture)

---

**🎉 Čestitamo!** Uspješno ste završili laboratorij 3 i sada možete stvarati, ispravljati pogreške i implementirati prilagođene MCP poslužitelje koristeći profesionalne radne tokove razvoja.

### 🔜 Nastavite na sljedeći modul

Spremni primijeniti svoje MCP vještine u stvarnom razvojnom tijeku? Nastavite na **[Modul 4: Praktični razvoj MCP-a - prilagođeni GitHub Clone Server](../lab4/README.md)** gdje ćete:
- Izgraditi proizvodno spreman MCP poslužitelj koji automatizira GitHub repozitorijske operacije
- Implementirati funkcionalnost kloniranja GitHub repozitorija preko MCP-a
- Integrirati prilagođene MCP poslužitelje s VS Code i GitHub Copilot Agent Modeom
- Testirati i implementirati prilagođene MCP poslužitelje u produkcijskim okruženjima
- Naučiti praktičnu automatizaciju radnih tokova za developere

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Napomena**:
Ovaj dokument je preveden korištenjem AI prevoditeljskog servisa [Co-op Translator](https://github.com/Azure/co-op-translator). Iako težimo točnosti, imajte na umu da automatski prijevodi mogu sadržavati greške ili netočnosti. Izvorni dokument na izvornom jeziku treba smatrati autoritativnim izvorom. Za važne informacije preporuča se profesionalni ljudski prijevod. Nismo odgovorni za bilo kakva nesporazumevanja ili pogrešne interpretacije koje proizlaze iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->