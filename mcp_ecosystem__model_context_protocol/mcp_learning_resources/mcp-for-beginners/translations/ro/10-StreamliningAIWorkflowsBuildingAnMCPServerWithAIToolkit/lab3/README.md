# 🔧 Modulul 3: Dezvoltare Avansată MCP cu Microsoft Foundry Toolkit

![Duration](https://img.shields.io/badge/Duration-20_minutes-blue?style=flat-square)
![Microsoft Foundry Toolkit](https://img.shields.io/badge/Microsoft_Foundry_Toolkit-Required-orange?style=flat-square)
![Python](https://img.shields.io/badge/Python-3.10+-green?style=flat-square)
![MCP SDK](https://img.shields.io/badge/MCP_SDK-1.9.3-purple?style=flat-square)
![Inspector](https://img.shields.io/badge/MCP_Inspector-0.14.0-blue?style=flat-square)

## 🎯 Obiective de Învățare

La finalul acestui laborator, veți putea:

- ✅ Crea servere MCP personalizate folosind Microsoft Foundry Toolkit
- ✅ Configura și utiliza cel mai recent MCP Python SDK (v1.9.3)
- ✅ Configura și utiliza MCP Inspector pentru depanare
- ✅ Depana serverele MCP în mediile Agent Builder și Inspector
- ✅ Înțelege fluxurile de dezvoltare avansate pentru servere MCP

## 📋 Cerințe Prealabile

- Finalizarea Laboratorului 2 (Fundamente MCP)
- VS Code cu extensia Microsoft Foundry Toolkit instalată
- Mediu Python 3.10+
- Node.js și npm pentru configurarea Inspector

## 🏗️ Ce Veți Construi

În acest laborator, veți crea un **Server MCP Meteo** care demonstrează:
- Implementarea unui server MCP personalizat
- Integrarea cu Microsoft Foundry Toolkit Agent Builder
- Fluxuri profesionale de depanare
- Utilizarea modernă a SDK-ului MCP

---

## 🔧 Prezentare Generală a Componentelor de Bază

### 🐍 MCP Python SDK
SDK-ul Model Context Protocol Python oferă fundația pentru construirea serverelor MCP personalizate. Veți utiliza versiunea 1.9.3 cu capabilități îmbunătățite de depanare.

### 🔍 MCP Inspector
Un instrument puternic de depanare care oferă:
- Monitorizare în timp real a serverului
- Vizualizarea execuției instrumentelor
- Inspectarea cererilor/răspunsurilor de rețea
- Mediu de testare interactiv

---

## 📖 Implementare Pas-cu-Pas

### Pasul 1: Creați un WeatherAgent în Agent Builder

1. **Lansați Agent Builder** în VS Code prin extensia Microsoft Foundry Toolkit
2. **Creați un agent nou** cu următoarea configurare:
   - Numele Agentului: `WeatherAgent`

![Agent Creation](../../../../translated_images/ro/Agent.c9c33f6a412b4cde.webp)

### Pasul 2: Inițializați Proiectul Server MCP

1. **Navigați la Tools** → **Add Tool** în Agent Builder
2. **Selectați "MCP Server"** din opțiunile disponibile
3. **Alegeți "Create A new MCP Server"**
4. **Selectați template-ul `python-weather`**
5. **Numiți serverul:** `weather_mcp`

![Python Template Selection](../../../../translated_images/ro/Pythontemplate.9d0a2913c6491500.webp)

### Pasul 3: Deschideți și Examinați Proiectul

1. **Deschideți proiectul generat** în VS Code
2. **Revizuiți structura proiectului:**
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

### Pasul 4: Actualizați la Cel Mai Recent MCP SDK

> **🔍 De ce să actualizăm?** Dorim să utilizăm cel mai recent MCP SDK (v1.9.3) și serviciul Inspector (0.14.0) pentru funcționalități îmbunătățite și capabilități de depanare superioare.

#### 4a. Actualizați Dependențele Python

**Editați `pyproject.toml`:** actualizați [./code/weather_mcp/pyproject.toml](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/pyproject.toml)


#### 4b. Actualizați Configurația Inspector

**Editați `inspector/package.json`:** actualizați [./code/weather_mcp/inspector/package.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package.json)

#### 4c. Actualizați Dependențele Inspector

**Editați `inspector/package-lock.json`:** actualizați [./code/weather_mcp/inspector/package-lock.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package-lock.json)

> **📝 Notă:** Acest fișier conține definiții extinse de dependențe. Mai jos este structura esențială - conținutul complet asigură rezolvarea corectă a dependențelor.


> **⚡ Fișier complet Package Lock:** Package-lock.json complet conține ~3000 linii de definiții pentru dependențe. Mai sus este structura cheie - folosiți fișierul furnizat pentru o rezolvare completă a dependențelor.

### Pasul 5: Configurați Depanarea în VS Code

*Notă: Vă rugăm să copiați fișierul în calea specificată pentru a înlocui fișierul local corespunzător*

#### 5a. Actualizați Configurația de Lansare

**Editați `.vscode/launch.json`:**

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

**Editați `.vscode/tasks.json`:**

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

## 🚀 Rularea și Testarea Serverului MCP

### Pasul 6: Instalați Dependențele

După ce ați făcut modificările de configurare, rulați următoarele comenzi:

**Instalați dependențele Python:**
```bash
uv sync
```

**Instalați dependențele Inspector:**
```bash
cd inspector
npm install
```

### Pasul 7: Depanați cu Agent Builder

1. **Apăsați F5** sau folosiți configurația **"Debug in Agent Builder"**
2. **Selectați configurația compusă** din panoul de depanare
3. **Așteptați pornirea serverului** și deschiderea Agent Builder
4. **Testați serverul dvs. meteo MCP** cu interogări în limbaj natural

Introduceți o solicitare ca aceasta

SYSTEM_PROMPT

```
You are my weather assistant
```

USER_PROMPT

```
How's the weather like in Seattle
```

![Agent Builder Debug Result](../../../../translated_images/ro/Result.6ac570f7d2b1d538.webp)

### Pasul 8: Depanați cu MCP Inspector

1. **Folosiți configurația "Debug in Inspector"** (Edge sau Chrome)
2. **Deschideți interfața Inspector** la `http://localhost:6274`
3. **Explorați mediul interactiv de testare:**
   - Vizualizați instrumentele disponibile
   - Testați execuția instrumentelor
   - Monitorizați cererile de rețea
   - Depanați răspunsurile serverului

![MCP Inspector Interface](../../../../translated_images/ro/Inspector.5672415cd02fe873.webp)

---

## 🎯 Rezultate Cheie ale Învățării

După finalizarea acestui laborator, ați:

- [x] **Creat un server MCP personalizat** folosind template-urile Microsoft Foundry Toolkit
- [x] **Actualizat la cel mai recent MCP SDK** (v1.9.3) pentru funcționalitate îmbunătățită
- [x] **Configurat fluxuri profesionale de depanare** pentru Agent Builder și Inspector
- [x] **Configurat MCP Inspector** pentru testare interactivă a serverului
- [x] **Stăpânit configurațiile de depanare VS Code** pentru dezvoltarea MCP

## 🔧 Funcționalități Avansate Exploatate

| Funcționalitate | Descriere | Caz de Utilizare |
|---------|-------------|----------|
| **MCP Python SDK v1.9.3** | Implementarea protocolului cea mai recentă | Dezvoltare modernă a serverelor |
| **MCP Inspector 0.14.0** | Instrument interactiv de depanare | Testare în timp real a serverelor |
| **Depanare VS Code** | Mediu integrat de dezvoltare | Flux de depanare profesional |
| **Integrarea Agent Builder** | Conexiune directă Microsoft Foundry Toolkit | Testare completă a agentului |

## 📚 Resurse Suplimentare

- [Documentație MCP Python SDK](https://modelcontextprotocol.io/docs/sdk/python)
- [Ghid Extensie Microsoft Foundry Toolkit](https://code.visualstudio.com/docs/ai/ai-toolkit)
- [Documentație Depanare VS Code](https://code.visualstudio.com/docs/editor/debugging)
- [Specificația Model Context Protocol](https://modelcontextprotocol.io/docs/concepts/architecture)

---

**🎉 Felicitări!** Ați finalizat cu succes Laboratorul 3 și acum puteți crea, depana și implementa servere MCP personalizate folosind fluxuri profesionale de dezvoltare.

### 🔜 Continuați la Modulul Următor

Doriți să aplicați abilitățile MCP într-un flux de lucru real? Continuați la **[Modulul 4: Dezvoltare MCP Practică - Server Personalizat de Clonare GitHub](../lab4/README.md)** unde veți:
- Construi un server MCP gata pentru producție care automatizează operațiuni cu depozite GitHub
- Implementa funcționalitatea de clonare depozite GitHub prin MCP
- Integra serverele MCP personalizate cu VS Code și GitHub Copilot Agent Mode
- Testa și implementa servere MCP personalizate în medii de producție
- Învața automatizarea practică a fluxurilor de lucru pentru dezvoltatori

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Declinare a responsabilității**:
Acest document a fost tradus folosind serviciul de traducere AI [Co-op Translator](https://github.com/Azure/co-op-translator). În timp ce ne străduim pentru acuratețe, vă rugăm să rețineți că traducerile automate pot conține erori sau inexactități. Documentul original în limba sa nativă trebuie considerat sursa autorizată. Pentru informații critice, se recomandă traducerea profesională realizată de un om. Nu ne asumăm responsabilitatea pentru eventualele neînțelegeri sau interpretări greșite care decurg din utilizarea acestei traduceri.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->