# 🔧  ಮೋಡ್ಯೂಲ್ 3: ಮೈಕ್ರೋಸಾಫ್ಟ್ ಫೌಂಡ್ರಿ ಟೂಲ್‌కಿಟ್‌తో ಉನ್ನತ MCP ಡೆವಲಪ್‌ಮೆಂಟ್

![Duration](https://img.shields.io/badge/Duration-20_minutes-blue?style=flat-square)
![Microsoft Foundry Toolkit](https://img.shields.io/badge/Microsoft_Foundry_Toolkit-Required-orange?style=flat-square)
![Python](https://img.shields.io/badge/Python-3.10+-green?style=flat-square)
![MCP SDK](https://img.shields.io/badge/MCP_SDK-1.9.3-purple?style=flat-square)
![Inspector](https://img.shields.io/badge/MCP_Inspector-0.14.0-blue?style=flat-square)

## 🎯 ಕಲಿಕಾ ಗುರಿಗಳು

ಈ ಪ್ರಯೋಗಾಲಯದ ಅಂತ್ಯಕ್ಕೆ, ನೀವು ಇವುಗಳನ್ನು ಮಾಡಲು ಸಾಧ್ಯವಾಗುತ್ತದೆ:

- ✅ ಮೈಕ್ರೋಸಾಫ್ಟ್ ಫೌಂಡ್ರಿ ಟೂಲ್‌ಕಿಟ್ ಬಳಸಿ ಕಸ್ಟಮ್ MCP ಸರ್ವರ್‌ಗಳು ರಚಿಸುವುದು
- ✅ ಇತ್ತೀಚಿನ MCP Python SDK (v1.9.3) ಅನ್ನು ಸಂರಚಿಸಿ ಮತ್ತು ಬಳಸುವುದು
- ✅ ಡಿಬಗ್ಗಿಂಗ್‌ಗೆ MCP ಇನ್ಸ್ಪೆಕ್ಟರ್ ಅನ್ನು ಸೆಟ್ ಅಪ್ ಮಾಡಿ ಮತ್ತು ಉಪಯೋಗಿಸುವುದು
- ✅ ಏಜೆಂಟ್ ಬಿಲ್ಡರ್ ಮತ್ತು ಇನ್ಸ್ಪೆಕ್ಟರ್ ಪರಿಸರಗಳಲ್ಲಿ MCP ಸರ್ವರ್‌ಗಳನ್ನು ಡಿಬಗ್ ಮಾಡುವುದು
- ✅ ಉನ್ನತ MCP ಸರ್ವರ್ ಅಭಿವೃದ್ಧಿ ಕಾರ್ಯಪ್ರವಾಹಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವುದು

## 📋 ಮುಂಭಾಗಗಳು

- ಪ್ರಯೋಗಾಲಯ 2 (MCP ಮೂಲಭೂತಗಳು) ಸಮಾಪ್ತಿ
- ಮೈಕ್ರೋಸಾಫ್ಟ್ ಫೌಂಡ್ರಿ ಟೂಲ್‌ಕಿಟ್ ವಿಸ್ತರಣೆ ಸ್ಥಾಪಿತ VS Code
- Python 3.10+ ಪರಿಸರ
- ಇನ್ಸ್ಪೆಕ್ಟರ್ ಸೆಟ್ ಅಪ್‌ಗೆ Node.js ಮತ್ತು npm

## 🏗️ ನೀವು ನಿರ್ಮಿಸುವುದು

ಈ ಪ್ರಯೋಗಾಲಯದಲ್ಲಿ, ನೀವು **ವೈದರ್ MCP ಸರ್ವರ್** ಅನ್ನು ರಚಿಸುವಿರಿ, ಇದು ತೋರಿಸುತ್ತದೆ:
- ಕಸ್ಟಮ್ MCP ಸರ್ವರ್ ಅನುಷ್ಠಾನ
- ಮೈಕ್ರೋಸಾಫ್ಟ್ ಫೌಂಡ್ರಿ ಟೂಲ್‌ಕಿಟ್ ಏಜೆಂಟ್ ಬಿಲ್ಡರ್‌ಸೊಂದಿಗೆ ಏಕೀಕರಣ
- ವೃತ್ತಿಪರ ಡಿಬಗ್ಗಿಂಗ್ ಕಾರ್ಯಪ್ರವಾಹಗಳು
- ಆಧುನಿಕ MCP SDK ಬಳಕೆ ಮಾದರಿಗಳು

---

## 🔧 ಪ್ರಮುಖ ಘಟಕಗಳ ಅವಲೋಕನ

### 🐍 MCP Python SDK
ಮಾದರಿ ಕಾಂಟೆಕ್ಸ್ಟ್ ಪ್ರೋಟೋಕಾಲ್ ಪೈಥಾನ್ SDK ಕಸ್ಟಮ್ MCP ಸರ್ವರ್‌ಗಳನ್ನು ನಿರ್ಮಿಸುವ ಮೂಲವನ್ನು ಒದಗಿಸುತ್ತದೆ. ನೀವು 1.9.3 ಆವೃತ್ತಿಯನ್ನು ಹೆಚ್ಚಿದ ಡಿಬಗ್ಗಿಂಗ್ ಸಾಮರ್ಥ್ಯಗಳೊಂದಿಗೆ ಬಳಸುತ್ತೀರಿ.

### 🔍 MCP ಇನ್ಸ್ಪೆಕ್ಟರ್
ಶಕ್ತಿಶಾಲಿ ಡಿಬಗ್ಗಿಂಗ್ ಸಾಧನ ಇದು ನೀಡುತ್ತದೆ:
- ನೈಜಕಾಲ ಸರ್ವರ್ ಪರಿ೯ವೇಶನ
- ಟೂಲ್ ಕಾರ್ಯನಿರ್ವಹಣೆಯ ದೃಶ್ಯೀಕರಣ
- ನೆಟ್ವರ್ಕ್ ವಿನಂತಿ/ಪ್ರತಿಕ್ರಿಯೆ ಪರಿಶೀಲನೆ
- ಪರಸ್ಪರ ಕ್ರಿಯಾಶೀಲ ಪರೀಕ್ಷಾ ಪರಿಸರ

---

## 📖 ಹಂತ-ಹಂತ ಅನುಷ್ಠಾನ

### ಹಂತ 1: ಏಜೆಂಟ್ ಬಿಲ್ಡರ್‌ನಲ್ಲಿ WeatherAgent ರಚನೆ

1. **VS Code ನಲ್ಲಿ ಮೈಕ್ರೋಸಾಫ್ಟ್ ಫೌಂಡ್ರಿ ಟೂಲ್‌ಕಿಟ್ ವಿಸ್ತರಣೆ ಮೂಲಕ ಏಜೆಂಟ್ ಬಿಲ್ಡರ್ ಪ್ರಾರಂಭಿಸಿ**
2. **ಕೆಳಗಿನ ಸಂರಚನೆಯೊಂದಿಗೆ ಹೊಸ ಏಜೆಂಟ್ ರಚಿಸಿ:**
   - ಏಜೆಂಟ್ ಹೆಸರು: `WeatherAgent`

![Agent Creation](../../../../translated_images/kn/Agent.c9c33f6a412b4cde.webp)

### ಹಂತ 2: MCP ಸರ್ವರ್ ಪ್ರಾಜೆಕ್ಟ್ ಆರಂಭಿಸಿ

1. **ಏಜೆಂಟ್ ಬಿಲ್ಡರ್‌ನಲ್ಲಿ Tools → Add Tool ನಾವಿಗೇಟ್ ಮಾಡಿ**
2. **ಲಭ್ಯವಿರುವ ಆಯ್ಕೆಗಳಿಂದ "MCP Server" ಆಯ್ಕೆಮಾಡಿ**
3. **"Create A new MCP Server" ಆಯ್ಕೆಮಾಡಿ**
4. **`python-weather` ಟೆಂಪ್ಲೇಟನ್ನು ಆರಿಸಿ**
5. **ನಿಮ್ಮ ಸರ್ವರ್‌ಗೆ ಹೆಸರು ನೀಡಿ:** `weather_mcp`

![Python Template Selection](../../../../translated_images/kn/Pythontemplate.9d0a2913c6491500.webp)

### ಹಂತ 3: ಪ್ರಾಜೆಕ್ಟ್ ತೆರೆಯಿರಿ ಮತ್ತು ಪರಿಶೀಲನೆ ಮಾಡಿ

1. **ಪ್ರಜನನ ಮಾಡಿದ ಪ್ರಾಜೆಕ್ಟ್ ಅನ್ನು VS Code ನಲ್ಲಿ ತೆರೆಯಿರಿ**
2. **ಪ್ರಾಜೆಕ್ಟ್ ರಚನೆಯ ಪರಿಶೀಲನೆ:**
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

### ಹಂತ 4: ಇತ್ತೀಚಿನ MCP SDKಗೆ ನವೀಕರಿಸಿ

> **🔍 ಏಕೆ ನವೀಕರಿಸಬೇಕು?** ಹೆಚ್ಚಿದ ವೈಶಿಷ್ಟ್ಯಗಳು ಮತ್ತು ಉತ್ತಮ ಡಿಬಗ್ಗಿಂಗ್ ಸಾಮರ್ಥ್ಯಗಳಿಗಾಗಿ ನಾವು ಇತ್ತೀಚಿನ MCP SDK (v1.9.3) ಮತ್ತು ಇನ್ಸ್ಪೆಕ್ಟರ್ ಸೇವೆ (0.14.0) ಬಳಸಲು ಬಯಸುತ್ತೇವೆ.

#### 4a. ಪೈಥಾನ್ ಅವಲಂಬನೆಗಳನ್ನು ನವೀಕರಿಸಿ

**`pyproject.toml` ಸಂಪಾದಿಸಿ:** [./code/weather_mcp/pyproject.toml](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/pyproject.toml) ನವೀಕರಿಸಿ


#### 4b. ಇನ್ಸ್ಪೆಕ್ಟರ್ ಸಂರಚನೆ ನವೀಕರಿಸಿ

**`inspector/package.json` ಸಂಪಾದಿಸಿ:** [./code/weather_mcp/inspector/package.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package.json) ನವೀಕರಿಸಿ

#### 4c. ಇನ್ಸ್ಪೆಕ್ಟರ್ ಅವಲಂಬನೆಗಳನ್ನು ನವೀಕರಿಸಿ

**`inspector/package-lock.json` ಸಂಪಾದಿಸಿ:** [./code/weather_mcp/inspector/package-lock.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package-lock.json) ನವೀಕರಿಸಿ

> **📝 ಸೂಚನೆ:** ಈ ಕಡತದಲ್ಲಿ ವ್ಯಾಪಕ ಅವಲಂಬನಾ ವ್ಯಾಖ್ಯಾನಗಳಿವೆ. ಕೆಳಗಿನದು ಅವಶ್ಯಕ ರಚನೆ — ಸಂಪೂರ್ಣ ವಿಷಯವು ಸರಿಯಾದ ಅವಲಂಬನಾ ಪರಿಹಾರವನ್ನು ಖಚಿತಪಡಿಸುತ್ತದೆ.


> **⚡ ಸಂಪೂರ್ಣ ಪ್ಯಾಕೇಜ್ ಲಾಕ್:** ಸಂಪೂರ್ಣ package-lock.json ನಲ್ಲಿ ~3000 ಸಾಲುಗಳ ಅವಲಂಬನಾ ವ್ಯಾಖ್ಯಾನಗಳಿವೆ. ಮೇಲಿನವು ಪ್ರಮುಖ ರಚನೆಯನ್ನು ತೋರಿಸುತ್ತದೆ — ಸಂಪೂರ್ಣ ಪರಿಹಾರಕ್ಕಾಗಿ ಕೊಡಲಾದ ಕಡತವನ್ನು ಬಳಸಿ.

### ಹಂತ 5: VS Code ಡಿಬಗ್ಗಿಂಗ್ ಸಂರಚನೆ ಮಾಡಿ

*ಟಿಪ್ಪಣಿ: ಸೂಚಿಸಲಾದ ಮಾರ್ಗದ ಫೈಲ್ ನಕಲು ಮಾಡಿ ಸ್ಥಳೀಯ ಫೈಲ್ ಬದಲಾಯಿಸುವುದು ಅಗತ್ಯ*

#### 5a. ಲಾಂಚ್ ಸಂರಚನೆ ನವೀಕರಿಸಿ

**`.vscode/launch.json` ಸಂಪಾದಿಸಿ:**

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

**`.vscode/tasks.json` ಸಂಪಾದಿಸಿ:**

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

## 🚀 ನಿಮ್ಮ MCP ಸರ್ವರ್ ಓಡಿಸಿ ಮತ್ತು ಪರೀಕ್ಷಿಸಿ

### ಹಂತ 6: ಅವಲಂಬನೆಗಳನ್ನು ಸ್ಥಾಪಿಸಿ

ಸಂರಚನೆ ಬದಲಾವಣೆಗಳನ್ನು ಮಾಡಿದ ಮೇಲೆ, ಕೆಳಗಿನ ಆದೇಶಗಳನ್ನು ನಿರ್ವಹಿಸಿ:

**ಪೈಥಾನ್ ಅವಲಂಬನೆಗಳನ್ನು ಸ್ಥಾಪಿಸಿ:**
```bash
uv sync
```

**ಇನ್ಸ್ಪೆಕ್ಟರ್ ಅವಲಂಬನೆಗಳನ್ನು ಸ್ಥಾಪಿಸಿ:**
```bash
cd inspector
npm install
```

### ಹಂತ 7: ಏಜೆಂಟ್ ಬಿಲ್ಡರ್ ನಲ್ಲಿ ಡಿಬಗ್ ಮಾಡಿ

1. **F5 ಒತ್ತಿ** ಅಥವಾ **"Debug in Agent Builder"** ಸಂರಚನೆಯನ್ನು ಬಳಸಿ
2. **ಡಿಬಗ್ ಪ್ಯಾನೆಲ್‌ನಿಂದ ಸಂಯುಕ್ತ ಸಂರಚನೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ**
3. **ಸರ್ವರ್ ಪ್ರಾರಂಭವಾಗಿಸಲು ಕಾಯಿರಿ ಮತ್ತು ಏಜೆಂಟ್ ಬಿಲ್ಡರ್ ತೆರೆಯಲು ಅವಕಾಶ ನೀಡಿ**
4. **ನೀವು ರಚಿಸಿದ weather MCP ಸರ್ವರ್ ಅನ್ನು ನೈಸರ್ಗಿಕ ಭಾಷೆ ಪ್ರಶ್ನೆಗಳಿಂದ ಪರೀಕ್ಷಿಸಿ**

ಈ ರೀತಿಯ ಪ್ರಾಂಪ್ಟ್ ನಮೂದಿಸಿ

SYSTEM_PROMPT

```
You are my weather assistant
```

USER_PROMPT

```
How's the weather like in Seattle
```

![Agent Builder Debug Result](../../../../translated_images/kn/Result.6ac570f7d2b1d538.webp)

### ಹಂತ 8: MCP ಇನ್ಸ್ಪೆಕ್ಟರ್‌ನಲ್ಲಿ ಡಿಬಗ್ ಮಾಡಿ

1. **"Debug in Inspector"** ಸಂರಚನೆಯನ್ನು (Edge ಅಥವಾ Chrome ನಲ್ಲಿ) ಬಳಸಿ
2. **`http://localhost:6274` ನಲ್ಲಿ ಇನ್ಸ್ಪೆಕ್ಟರ್ ಇಂಟರ್‌ಫೇಸ್ ತೆರೆಯಿರಿ**
3. **ಪರಸ್ಪರ ಕ್ರಿಯಾಶೀಲ ಪರೀಕ್ಷಾ ಪರಿಸರ ಅನ್ವೇಷಿಸಿ:**
   - ಲಭ್ಯವಿರುವ ಟೂಲ್‌ಗಳನ್ನು ವೀಕ್ಷಿಸಿ
   - ಟೂಲ್ ನಿರ್ವಹಣೆಯನ್ನು ಪರೀಕ್ಷಿಸಿ
   - ನೆಟ್ವರ್ಕ್ ವಿನಂತಿಗಳನ್ನು ಗಮನಿಸಿ
   - ಸರ್ವರ್ ಪ್ರತಿಕ್ರಿಯೆಗಳ ಡಿಬಗ್ಗಿಂಗ್ ಮಾಡಿ

![MCP Inspector Interface](../../../../translated_images/kn/Inspector.5672415cd02fe873.webp)

---

## 🎯 ಪ್ರಮುಖ ಕಲಿಕಾ ಫಲಿತಾಂಶಗಳು

ಈ ಪ್ರಯೋಗಾಲಯ ಮುಗಿಸಿದ್ದು, ನೀವು:

- [x] **ಮೈಕ್ರೋಸಾಫ್ಟ್ ಫೌಂಡ್ರಿ ಟೂಲ್‌ಕಿಟ್ ಟೆಂಪ್ಲೇಟ್ಗಳೊಂದಿಗೆ ಕಸ್ಟಮ್ MCP ಸರ್ವರ್ ರಚಿಸಿದರು**
- [x] **ಹೆಚ್ಚಳವಾದ ಕಾರ್ಯಾಚರಣೆಗೆ ಇತ್ತೀಚಿನ MCP SDK (v1.9.3) ಗೆ ನವೀಕರಿಸಿಕೊಂಡಿರಿ**
- [x] **ಏಜೆಂಟ್ ಬಿಲ್ಡರ್ ಮತ್ತು ಇನ್ಸ್ಪೆಕ್ಟರ್‌ಗೆ ವೃತ್ತಿಪರ ಡಿಬಗ್ಗಿಂಗ್ ಕಾರ್ಯಪ್ರವಾಹಗಳನ್ನು ಸಂರಚಿಸಿದರು**
- [x] **ಪರಸ್ಪರ ಕ್ರಿಯಾಶೀಲ ಸರ್ವರ್ ಪರೀಕ್ಷೆಗೆ MCP ಇನ್ಸ್ಪೆಕ್ಟರ್ ಅನ್ನು ಸೆಟ್ ಅಪ್ ಮಾಡಿಕೊಂಡಿರಿ**
- [x] **MCP ಅಭಿವೃದ್ಧಿಗಾಗಿ VS Code ಡಿಬಗ್ಗಿಂಗ್ ಸಂರಚನೆಗಳಲ್ಲಿ ಪರಿಣತಿ ಹೊಂದಿದ್ದೀರಿ**

## 🔧 ಅನ್ವೇಷಿಸಿದ ಉನ್ನತ ವೈಶಿಷ್ಟ್ಯಗಳು

| ವೈಶಿಷ್ಟ್ಯ | ವಿವರಣೆ | ಬಳಕೆಯ ಆಚರಣೆ |
|---------|-------------|----------|
| **MCP Python SDK v1.9.3** | ಇತ್ತೀಚಿನ ಪ್ರೋಟೋಕಾಲ್ ಅನುಷ್ಠಾನ | ಆಧುನಿಕ ಸರ್ವರ್ ಅಭಿವೃದ್ಧಿ |
| **MCP ಇನ್ಸ್ಪೆಕ್ಟರ್ 0.14.0** | ಪರಸ್ಪರ ಕ್ರಿಯಾಶೀಲ ಡಿಬಗ್ಗಿಂಗ್ ಸಾಧನ | ನೈಜಕಾಲ ಸರ್ವರ್ ಪರೀಕ್ಷೆ |
| **VS Code ಡಿಬಗ್ಗಿಂಗ್** | ಸಂಯೋಜಿತ ಡೆವಲಪ್‌ಮೆಂಟ್ ಪರಿಸರ | ವೃತ್ತಿಪರ ಡಿಬಗ್ಗಿಂಗ್ ಕಾರ್ಯಪ್ರವಾಹ |
| **ಏಜೆಂಟ್ ಬಿಲ್ಡರ್ ಏಕೀಕರಣ** | ಡೈರೆಕ್ಟ್ ಮೈಕ್ರೋಸಾಫ್ಟ್ ಫೌಂಡ್ರಿ ಟೂಲ್‌ಕಿಟ್ ಸಂಪರ್ಕ | ಅಂತ್ಯ-ಗೆ-अಂತ ಏಜೆಂಟ್ ಪರೀಕ್ಷೆ |

## 📚 ಹೆಚ್ಚುವರಿ ಸಂಪನ್ಮೂಲಗಳು

- [MCP Python SDK ಡಾಕ್ಯುಮೆಂಟೇಶನ್](https://modelcontextprotocol.io/docs/sdk/python)
- [ಮೈಕ್ರೋಸಾಫ್ಟ್ ಫೌಂಡ್ರಿ ಟೂಲ್‌ಕಿಟ್ ವಿಸ್ತರಣೆ ಮಾರ್ಗದರ್ಶಕ](https://code.visualstudio.com/docs/ai/ai-toolkit)
- [VS Code ಡಿಬಗ್ಗಿಂಗ್ ಡಾಕ್ಯುಮೆಂಟೇಶನ್](https://code.visualstudio.com/docs/editor/debugging)
- [ಮಾದರಿ ಕಾಂಟೆಕ್ಸ್ಟ್ ಪ್ರೋಟೋಕಾಲ್ ಸ್ಪೆಸಿಫಿಕೇಶನ್](https://modelcontextprotocol.io/docs/concepts/architecture)

---

**🎉 ಅಭಿನಂದನೆಗಳು!** ನೀವು ಲ್ಯಾಬ್ 3 ಯಶಸ್ವಿಯಾಗಿ ಮುಗಿಸಿದ್ದರು ಮತ್ತು ಈಗ ವೃತ್ತಿಪರ ಅಭಿವೃದ್ಧಿ ಕಾರ್ಯಪ್ರವಾಹಗಳನ್ನು ಬಳಸಿಕೊಂಡು ಕಸ್ಟಮ್ MCP ಸರ್ವರ್‌ಗಳನ್ನು ರಚಿಸಲು, ಡಿಬಗ್ ಮಾಡಲು ಮತ್ತು ಕಾರ್ಯಗತಗೊಳಿಸಲು ಸಿದ್ಧರಾಗಿದ್ದೀರಿ.

### 🔜 ಮುಂದಿನ ಮೋಡ್ಯೂಲ್‌ಗೆ ಮುಂದುವರೆಯಿರಿ

ನಿಮ್ಮ MCP ನಿಪುಣತೆಗಳನ್ನು ವಾಸ್ತವಿಕ ಅಭಿವೃದ್ಧಿ ಕಾರ್ಯಪ್ರವಾಹದಲ್ಲಿ ಅನ್ವಯಿಸಲು ಸಿದ್ಧರಾ? ಮುಂದುವರೆಯಿರಿ **[ಮೋಡ್ಯೂಲ್ 4: ಪ್ರಾಯೋಗಿಕ MCP ಅಭಿವೃದ್ಧಿ - ಕಸ್ಟಮ್ GitHub ಕ್ಲೋನ್ ಸರ್ವರ್](../lab4/README.md)** ಎಲ್ಲಿ ನೀವು:
- GitHub ರೆಪೋಸಿಟರಿ ಕಾರ್ಯಾಚರಣೆಗಳನ್ನು ಸ್ವಯಂಚಾಲಿತಗೊಳಿಸುವ ಉತ್ಪಾದನಾ ಸಿದ್ಧ MCP ಸರ್ವರ್ ನಿರ್ಮಿಸುವಿರಿ
- MCP ಮೂಲಕ GitHub ರೆಪೋಸಿಟರಿ ಕ್ಲೋನಿಂಗ್ ಕಾರ್ಯಕ್ಷಮತೆಯನ್ನು ಜಾರಿಗೆ ತರುವುದು
- VS Code ಮತ್ತು GitHub Copilot ಏಜೆಂಟ್ ಮೋಡ್‌ನೊಂದಿಗೆ ಕಸ್ಟಮ್ MCP ಸರ್ವರ್‌ಗಳನ್ನು ಏಕೀಕರಿಸುವುದು
- ಉತ್ಪಾದನಾ ಪರಿಸರದಲ್ಲಿ ಕಸ್ಟಮ್ MCP ಸರ್ವರ್‌ಗಳನ್ನು ಪರೀಕ್ಷಿಸಿ ಮತ್ತು ನಿಯೋಜಿಸುವುದು
- ಡೆವಲಪರ್‌ಗಳಿಗೆ ಪ್ರಾಯೋಗಿಕ ಕಾರ್ಯಪ್ರವಾಹ ಸ್ವಯಂಕ್ರಿಯೆಯನ್ನು ಕಲಿಯುವಿರಿ

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ಅಸ್ವೀಕಾರ**:
ಈ ದಸ್ತಾವೇಜು AI ಅನುವಾದ ಸೇವೆ [Co-op Translator](https://github.com/Azure/co-op-translator) ಬಳಸಿ ಅನುವಾದಿಸಲಾಗಿದೆ. ನಾವು ನಿಖರತೆಯನ್ನು ಸಾಧಿಸಲು ಪ್ರಯತ್ನಿಸುತ್ತಿದ್ದರೂ, ದಯವಿಟ್ಟು ಗಮನಿಸಿ, ಸ್ವಯಂಚಾಲಿತ ಅನುವಾದಗಳಲ್ಲಿ ದೋಷಗಳು ಅಥವಾ ಅಸಡ್ಡೆಗಳು ಇರಬಹುದು. ಮೂಲ ಭಾಷೆಯಲ್ಲಿರುವ ಮೂಲ ದಸ್ತಾವೇಜು ಪ್ರಾಮಾಣಿಕ ಮೂಲವೆಂದು ಪರಿಗಣಿಸಬೇಕು. ಪ್ರಮುಖ ಮಾಹಿತಿಗಾಗಿ, ವೃತ್ತಿಪರ ಮಾನವ ಅನುವಾದವನ್ನು ಶಿಫಾರಸು ಮಾಡಲಾಗುತ್ತದೆ. ಈ ಅನುವಾದವನ್ನು ಬಳಸುವ ಮೂಲಕ ಉಂಟಾಗುವ ಯಾವುದೇ ತಪ್ಪು ಅರ್ಥಗಳ ಅಥವಾ ತಪ್ಪು ವ್ಯಾಖ್ಯಾನಗಳ ಬಗ್ಗೆ ನಾವು ಹೊಣೆಗಾರರಲ್ಲ.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->