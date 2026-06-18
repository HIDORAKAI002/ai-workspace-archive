# 🔧 Module 3: Microsoft Foundry Toolkit ഉപയോഗിച്ച് ഉന്നത MCP വികസനം

![Duration](https://img.shields.io/badge/Duration-20_minutes-blue?style=flat-square)
![Microsoft Foundry Toolkit](https://img.shields.io/badge/Microsoft_Foundry_Toolkit-Required-orange?style=flat-square)
![Python](https://img.shields.io/badge/Python-3.10+-green?style=flat-square)
![MCP SDK](https://img.shields.io/badge/MCP_SDK-1.9.3-purple?style=flat-square)
![Inspector](https://img.shields.io/badge/MCP_Inspector-0.14.0-blue?style=flat-square)

## 🎯 പഠനലക്ഷ്യങ്ങൾ

ഈ ലാബിന്റെ അവസാനം നിങ്ങൾക്ക് ചെയ്യും:

- ✅ Microsoft Foundry Toolkit ഉപയോഗിച്ച് കസ്റ്റം MCP സർവറുകൾ സൃഷ്ടിക്കുക
- ✅ ഏറ്റവും പുതിയ MCP Python SDK (v1.9.3) കോൺഫിഗർ ചെയ്തു ഉപയോഗിക്കുക
- ✅ ഡീബഗിംഗിനായി MCP ഇൻസ്പെക്ടർ സജ്ജീകരിക്കുകയും ഉപയോഗിക്കുകയും ചെയ്യുക
- ✅ Agent Builder-ൽയും Inspector പരിസരങ്ങളിലും MCP സർവർ ഡീബഗ് ചെയ്യുക
- ✅ ഉന്നത MCP സർവർ വികസന പ്രവൃത്തിപരമ്പരകൾ മനസ്സിലാക്കുക

## 📋 മുൻഅവശ്യങ്ങൾ

- ലാബ് 2 (MCP അടിസ്ഥാനങ്ങൾ) പൂർത്തിയാക്കിയത്
- Microsoft Foundry Toolkit എക്സ്റ്റൻഷൻ ഇൻസ്റ്റാൾ ചെയ്ത VS Code
- Python 3.10+ പരിസ്ഥിതി
- Inspector സജ്ജീകരണത്തിനായി Node.js‌, npm

## 🏗️ നിങ്ങൾ നിർമ്മിക്കാനുള്ളത്

ഈ ലാബിൽ, നിങ്ങൾ ഒരു **Weather MCP Server** സൃഷ്ടിക്കും, ഇതിലൂടെ കാണിക്കും:
- കസ്റ്റം MCP സർവർ നടപ്പാക്കൽ
- Microsoft Foundry Toolkit Agent Builder-ൽ ലയിക്കൽ
- പ്രൊഫഷണൽ ഡീബഗിംഗ് പ്രവൃത്തിപരമ്പരകൾ
- ആധുനിക MCP SDK ഉപയോഗ മാതൃകകൾ

---

## 🔧 പ്രധാന ഘടകങ്ങൾ അവലോകനം

### 🐍 MCP Python SDK
Model Context Protocol Python SDK കസ്റ്റം MCP സർവർ നിർമണത്തിനായുള്ള അടിസ്ഥാനം നൽകുന്നു. നിങ്ങൾ ഉപയോഗിക്കും പതിപ്പ് 1.9.3, മെച്ചപ്പെടുത്തിയ ഡീബഗിംഗ് സവിശേഷതകൾക്കായി.

### 🔍 MCP Inspector
ശക്തമായ ഒരു ഡീബഗിംഗ് ഉപകരണം:
- റിയൽ-ടൈം സർവർ നിരീക്ഷണം
- ടൂൾ പ്രവർത്തനം കാഴ്ചവെച്ച് കാണിക്കൽ
- നെറ്റ്വർക്ക് അഭ്യർത്ഥന/പ്രതികരണ പരിശോധന
- സംവേദനാത്മക ടെസ്റ്റിംഗ് പരിസരം

---

## 📖 ഘട്ടം-ഘട്ടമായി നടപ്പാക്കൽ

### ഘട്ടം 1: Agent Builder-ൽ WeatherAgent സൃഷ്ടിക്കുക

1. VS Code-ൽ Microsoft Foundry Toolkit എക്സ്റ്റൻഷൻ വഴി **Agent Builder ആരംഭിക്കുക**
2. താഴെക്കൊടുത്തിരിക്കുന്ന കോൺഫിഗറേഷൻ ഉപയോഗിച്ചു **പുതിയ ഏജന്റ് സൃഷ്ടിക്കുക:**
   - ഏജന്റ് പേര്: `WeatherAgent`

![Agent Creation](../../../../translated_images/ml/Agent.c9c33f6a412b4cde.webp)

### ഘട്ടം 2: MCP Server പ്രോജക്റ്റ് ശേഖരം ആരംഭിക്കുക

1. Agent Builder-ൽ **Tools → Add Tool** പോകുക
2. ലഭ്യമായ ഓപ്ഷനുകളിൽ **"MCP Server" തിരഞ്ഞെടുക്കുക**
3. **"Create A new MCP Server" തിരഞ്ഞെടുക്കുക**
4. `python-weather` ടെംപ്ലേറ്റ് തിരഞ്ഞെടുക്കുക
5. സർവറിന്റെ പേര് നൽകുക: `weather_mcp`

![Python Template Selection](../../../../translated_images/ml/Pythontemplate.9d0a2913c6491500.webp)

### ഘട്ടം 3: പ്രോജക്റ്റ് തുറന്ന് പരിശോധിക്കുക

1. VS Code-ൽ സൃഷ്ടിച്ച പ്രോജക്റ്റ് തുറക്കുക
2. പ്രോജക്റ്റിന്റെ ഘടന പരിശോധിക്കുക:
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


### ഘട്ടം 4: MCP SDK ഏറ്റവും പുതിയ പതിപ്പിലേക്ക് അപ്ഗ്രേഡ് ചെയ്യുക

> **🔍 അപ്ഗ്രേഡ് کیوں?** മെച്ചപ്പെട്ട സവിശേഷതകളും മികച്ച ഡീബഗിംഗ് ശേഷികളും ലഭിക്കാൻ ഏറ്റവും പുതിയ MCP SDK (v1.9.3)യും Inspector സർവീസും (0.14.0) ഉപയോഗിക്കാനാണ് ആഗ്രഹം.

#### 4a. Python ആശ്രിതങ്ങൾ അപ്ഡേറ്റ് ചെയ്യുക

**`pyproject.toml` എഡിറ്റ് ചെയ്യുക:** [./code/weather_mcp/pyproject.toml](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/pyproject.toml) അപ്ഡേറ്റ് ചെയ്യുക

#### 4b. Inspector കോൺഫിഗറേഷൻ അപ്ഡേറ്റ് ചെയ്യുക

**`inspector/package.json` എഡിറ്റ് ചെയ്യുക:** [./code/weather_mcp/inspector/package.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package.json) അപ്ഡേറ്റ് ചെയ്യുക

#### 4c. Inspector ആശ്രിതങ്ങൾ അപ്ഡേറ്റ് ചെയ്യുക

**`inspector/package-lock.json` എഡിറ്റ് ചെയ്യുക:** [./code/weather_mcp/inspector/package-lock.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package-lock.json)

> **📝 ശ്രദ്ധിക്കുക:** ഈ ഫയലിൽ വ്യാപകമായ ആശ്രിത വ്യവസ്ഥകൾ ഉൾക്കൊള്ളുന്നു. താഴെ കൊടുത്തത് സഹായക ഘടനയാണ് - പൂർണ്ണ ഉള്ളടക്കം ശരിയായ ആശ്രിത പരിഹാരത്തിനായി ആവശ്യമാണ്.

> **⚡ പൂർണ പാക്കേജ് ലോക്ക്:** package-lock.json ഫയൽ ~3000 വരികൾ ആശ്രിത നിർവചനങ്ങൾ ഉൾക്കൊള്ളുന്നു. മുകളിൽ കൊടുത്തത് പ്രധാന ഘടന നൽകുന്നു - പൂർണ ആശ്രിത പരിഹാരത്തിന് ഫയൽ ഉപയോഗിക്കുക.

### ഘട്ടം 5: VS Code ഡീബഗിംഗ് കോൺഫിഗർ ചെയ്യുക

*കുറിപ്പ്: നൽകിയിട്ടുള്ള പാത്തിലുള്ള ഫയൽ അതിന്റെ പ്രാദേശിക ഫയലുമായി പ്രതിസ്‌ഥാപിക്കാൻ ദയവായി കോപ്പി ചെയ്യുക*

#### 5a. ലാഞ്ച് കോൺഫിഗറേഷൻ അപ്ഡേറ്റ് ചെയ്യുക

**`.vscode/launch.json` എഡിറ്റ് ചെയ്യുക:**

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

**`.vscode/tasks.json` എഡിറ്റ് ചെയ്യുക:**

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

## 🚀 MCP സർവർ റൺ ചെയ്ത് ടെസ്റ്റ് ചെയ്യുക

### ഘട്ടം 6: ആശ്രിതങ്ങൾ ഇൻസ്റ്റാൾ ചെയ്യുക

കോൺഫിഗറേഷൻ മാറ്റങ്ങൾ നടത്തിയതിന് ശേഷം, താഴെ കൊടുത്ത കമാൻഡുകൾ ഓടിക്കുക:

**Python ആശ്രിതങ്ങൾ ഇൻസ്റ്റാൾ ചെയ്യുക:**
```bash
uv sync
```

**Inspector ആശ്രിതങ്ങൾ ഇൻസ്റ്റാൾ ചെയ്യുക:**
```bash
cd inspector
npm install
```


### ഘട്ടം 7: Agent Builder ഉപയോഗിച്ച് ഡീബഗ് ചെയ്യുക

1. **F5 അമർക്കുക** അല്ലെങ്കിൽ **"Debug in Agent Builder"** കോൺഫിഗറേഷൻ ഉപയോഗിക്കുക
2. ഡീബഗ് പാനലിൽ നിന്നു **കമ്പൗണ്ട് കോൺഫിഗറേഷൻ** തിരഞ്ഞെടുക്കുക
3. സർവർ ആരംഭിക്കാനും Agent Builder തുറക്കാനും കാത്തിരിക്കുക
4. സ്വാഭാവിക ഭാഷാ ക്വസറികൾ ഉപയോഗിച്ച് നിങ്ങളുടെ weather MCP server പരീക്ഷിക്കുക

ഇങ്ങനെ ഇൻപുട്ട് പ്രോംപ്റ്റ് നൽകുക

SYSTEM_PROMPT

```
You are my weather assistant
```

USER_PROMPT

```
How's the weather like in Seattle
```

![Agent Builder Debug Result](../../../../translated_images/ml/Result.6ac570f7d2b1d538.webp)

### ഘട്ടം 8: MCP Inspector ഉപയോഗിച്ച് ഡീബഗ് ചെയ്യുക

1. **"Debug in Inspector"** കോൺഫിഗറേഷൻ (Edge അല്ലെങ്കിൽ Chrome) ഉപയോഗിക്കുക
2. `http://localhost:6274`-ൽ Inspector ഇന്റർഫേസ് തുറക്കുക
3. സംവേദനാത്മക ടെസ്റ്റിംഗ് പരിസരം കണ്ടെത്തുക:
   - ലഭ്യമായ ടൂളുകൾ കാണുക
   - ടൂൾ പ്രവർത്തനം പരിശോദിക്കുക
   - നെറ്റ്വർക്ക് അഭ്യർത്ഥനകൾ നിരീക്ഷിക്കുക
   - സർവർ പ്രതികരണങ്ങൾ ഡീബഗ് ചെയ്യുക

![MCP Inspector Interface](../../../../translated_images/ml/Inspector.5672415cd02fe873.webp)

---

## 🎯 പ്രധാന പഠനഫലം

ഈ ലാബ് പൂർത്തിയാക്കിയതിലൂടെ നിങ്ങൾ:

- [x] **Microsoft Foundry Toolkit ടെംപ്ലേറ്റുകൾ ഉപയോഗിച്ച് കസ്റ്റം MCP сервер സൃഷ്ടിച്ചു**
- [x] **കൂടുതൽ പ്രവർത്തനശേഷിയേടെ MCP SDK (v1.9.3)** അപ്ഗ്രേഡ് ചെയ്തു
- [x] **Agent Builder-നും Inspector-നും പ്രൊഫഷണൽ ഡീബഗിംഗ് പ്രവൃത്തിപരമ്പരകൾ കോൺഫിഗർ ചെയ്തു**
- [x] **MCP Inspector സംവേദനാത്മക ടെസ്റ്റിങിനായി സജ്ജമാക്കിയത്**
- [x] **MCP വികസനത്തിനായി VS Code ഡീബഗിംഗ് കോൺഫിഗറേഷൻ മാസ്റ്റർ ചെയ്തു**

## 🔧 പരീക്ഷിച്ച ഉന്നത സവിശേഷതകൾ

| സവിശേഷത | വിവരണം | ഉപയോഗം |
|---------|-------------|----------|
| **MCP Python SDK v1.9.3** | ഏറ്റവും പുതിയ പ്രോട്ടോക്കോൾ നടപ്പാക്കൽ | ആധുനിക സർവർ വികസനം |
| **MCP Inspector 0.14.0** | സംവേദനാത്മക ഡീബഗിംഗ് ഉപകരണം | റിയൽ-ടൈം സർവർ ടെസ്റ്റിംഗ് |
| **VS Code ഡീബഗിംഗ്** | സംയോജിത വികസന പരിസ്ഥിതി | പ്രൊഫഷണൽ ഡീബഗിംഗ് പ്രവൃത്തിപരമ്പര |
| **Agent Builder ലയിക്കൽ** | Microsoft Foundry Toolkit-നൊപ്പം നേരിട്ട് ബന്ധിപ്പിക്കൽ | എഞ്ചിൻ മുഴുവൻ പരീക്ഷണം |

## 📚 കൂടിയിട്ടുള്ള വസതികൾ

- [MCP Python SDK ഡോക്യുമെന്റേഷൻ](https://modelcontextprotocol.io/docs/sdk/python)
- [Microsoft Foundry Toolkit എക്സ്റ്റൻഷൻ ഗൈഡ്](https://code.visualstudio.com/docs/ai/ai-toolkit)
- [VS Code ഡീബഗിംഗ് ഡോക്യുമെന്റേഷൻ](https://code.visualstudio.com/docs/editor/debugging)
- [Model Context Protocol സ്പെസിഫിക്കേഷൻ](https://modelcontextprotocol.io/docs/concepts/architecture)

---

**🎉 അഭിനন্দനങ്ങൾ!** നിങ്ങൾ വിജയകരമായി ലാബ് 3 പൂർത്തിയാക്കി, ഇപ്പോൾ പ്രൊഫഷണൽ വികസന പ്രവൃത്തികളിലൂടെ കസ്റ്റം MCP സർവറുകൾ സൃഷ്ടിക്കുന്നതും ഡീബഗ് ചെയ്ത് ഡിപ്ലോയ് ചെയ്യുന്നതും കഴിയും.

### 🔜 അടുത്ത മൊഡ്യൂളിലേക്ക് പോകുക

നിങ്ങളുടെ MCP കഴിവുകൾ യഥാർത്ഥ വികസന പ്രവൃത്തിപരമ്പരയിലേക്ക് പ്രയോഗിക്കാൻ തയ്യാറാണോ? **[Module 4: Practical MCP Development - Custom GitHub Clone Server](../lab4/README.md)**-ലേക്ക് മുന്നേറുക, ഇവിടെ നിങ്ങൾ ചെയ്യും:
- GitHub റിപ്പോസിറ്ററി ഓപ്പറേഷനുകൾ സ്വയം നിയന്ത്രിക്കുന്ന പ്രൊഡക്ഷൻ-സജ്ജ MCP സർവർ നirmaṇaṁ
- MCP വഴി GitHub റിപ്പോസിറ്ററി ക്ലോൺ ഫങ്ഷണാലിറ്റി നടപ്പാക്കുക
- VS Code-ഉം GitHub Copilot Agent Mode-ഉം ഉപയോഗിച്ചുകൊണ്ട് കസ്റ്റം MCP സർവറുകൾ ലയിക്കൽ
- പ്രൊഡക്ഷൻ പരിസരങ്ങളിൽ കസ്റ്റം MCP സർവറുകൾ ടെസ്റ്റ് ചെയ്ത് ഡിപ്ലോയ് ചെയ്യുക
- ഡെവലപ്പർമാർക്കായുള്ള പ്രായോഗിക പ്രവൃത്തിപരമ്പര ഓട്ടോമേഷൻ പഠിക്കുക

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**അറിയിപ്പ്**:
ഈ രേഖ AI പരിഭാഷാ സേവനം [Co-op Translator](https://github.com/Azure/co-op-translator) ഉപയോഗിച്ച് പരിഭാഷപ്പെടുത്തിയതാണ്. ഞങ്ങൾ കൃത്യതയ്ക്കായി ശ്രമിക്കുന്നുവെങ്കിലും, ഓട്ടോമേറ്റഡ് പരിഭാഷകളിൽ പിഴവുകൾ അല്ലെങ്കിൽ തെറ്റായ വിവരങ്ങൾ ഉണ്ടാകാൻ സാധ്യതയുണ്ട്. അതിന്റെ സ്വാഭാവിക ഭാഷയിലുള്ള അസൽ രേഖയാണ് പ്രാമാണികമായ ഉറവിടമായി പരിഗണിക്കേണ്ടത്. നിർണായകമായ വിവരങ്ങൾക്ക്, പ്രൊഫഷണൽ മനുഷ്യ പരിഭാഷ ശുപാർശ ചെയ്യുന്നു. ഈ പരിഭാഷ ഉപയോഗിച്ച് ഉണ്ടാകുന്ന തെറ്റിദ്ധാരണകൾ അല്ലെങ്കിൽ തെറ്റായ വ്യാഖ്യാനങ്ങൾക്കായി ഞങ്ങൾ ഉത്തരവാദികളല്ല.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->