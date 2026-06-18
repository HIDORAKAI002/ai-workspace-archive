# 🔧 Module 3: ਮਾਇਕ੍ਰੋਸਾਫਟ ਫਾਊਂਡਰੀ ਟੂਲਕਿਟ ਨਾਲ ਐਡਵਾਂਸਡ MCP ਵਿਕਾਸ

![Duration](https://img.shields.io/badge/Duration-20_minutes-blue?style=flat-square)
![Microsoft Foundry Toolkit](https://img.shields.io/badge/Microsoft_Foundry_Toolkit-Required-orange?style=flat-square)
![Python](https://img.shields.io/badge/Python-3.10+-green?style=flat-square)
![MCP SDK](https://img.shields.io/badge/MCP_SDK-1.9.3-purple?style=flat-square)
![Inspector](https://img.shields.io/badge/MCP_Inspector-0.14.0-blue?style=flat-square)

## 🎯 ਸਿੱਖਣ ਦੇ ਉਦਦੇਸ਼

ਇਸ ਲੈਬ ਦੇ ਅੰਤ ਤੱਕ, ਤੁਸੀਂ ਸਮਰੱਥ ਹੋਵੋਗੇ:

- ✅ ਮਾਇਕ੍ਰੋਸਾਫਟ ਫਾਊਂਡਰੀ ਟੂਲਕਿਟ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਕਸਟਮ MCP ਸਰਵਰ ਬਣਾਉਣਾ  
- ✅ ਨਵੀਂ MCP Python SDK (v1.9.3) ਨੂੰ ਸੰਰਚਿਤ ਅਤੇ ਵਰਤਣਾ  
- ✅ MCP ਇੰਸਪੈਕਟਰ ਦੇ ਨਾਲ ਡੀਬੱਗਿੰਗ ਲਈ ਸੈਟਅੱਪ ਅਤੇ ਸਦਉਪਯੋਗ ਕਰਨਾ  
- ✅ Agent Builder ਅਤੇ ਇੰਸਪੈਕਟਰ ਵਾਤਾਵਰਨਾਂ ਵਿੱਚ MCP ਸਰਵਰ ਨੂੰ ਡੀਬੱਗ ਕਰਨਾ  
- ✅ ਅਗਾਂਹ MCP ਸਰਵਰ ਵਿਕਾਸ ਵਰਕਫਲੋਜ਼ ਨੂੰ ਸਮਝਣਾ  

## 📋 ਲੋੜੀਂਦਾ ਸਮਾਨ

- ਲੈਬ 2 (MCP ਮੁਢਲਾ ਗਿਆਨ) ਮੁਕੰਮਲ ਕੀਤਾ ਹੋਇਆ  
- VS Code ਜਿਸ ਵਿੱਚ ਮਾਇਕ੍ਰੋਸਾਫਟ ਫਾਊਂਡਰੀ ਟੂਲਕਿਟ ਵਿਸ਼ਤਾਰ ਸਥਾਪਿਤ ਕੀਤਾ ਹੋਵੇ  
- Python 3.10+ ਵਾਤਾਵਰਨ  
- ਇੰਸਪੈਕਟਰ ਸੈਟਅੱਪ ਲਈ Node.js ਅਤੇ npm  

## 🏗️ ਤੁਸੀਂ ਕੀ ਬਣਾਵੋਗੇ

ਇਸ ਲੈਬ ਵਿੱਚ, ਤੁਸੀਂ ਇੱਕ **ਮੌਸਮ MCP ਸਰਵਰ** ਬਣਾਵੋਗੇ ਜੋ ਨਿਮਨਲਿਖਤ ਨੂੰ ਦਰਸਾਉਂਦਾ ਹੈ:  
- ਕਸਟਮ MCP ਸਰਵਰ ਇੰਪਲੀਮੈਂਟੇਸ਼ਨ  
- ਮਾਇਕ੍ਰੋਸਾਫਟ ਫਾਊਂਡਰੀ ਟੂਲਕਿਟ Agent Builder ਨਾਲ ਏਕੀਕਰਨ  
- ਪ੍ਰੋਫੈਸ਼ਨਲ ਡੀਬੱਗਿੰਗ ਵਰਕਫਲੋਜ਼  
- ਆਧੁਨਿਕ MCP SDK ਵਰਤੋਂ ਦੇ ਨਮੂਨੇ  

---

## 🔧 ਮੁੱਖ ઘટਕਾਂ ਦਾ ਜਾਇਜ਼ਾ

### 🐍 MCP Python SDK

ਮਾਡਲ ਸੰਦਰਭ ਪ੍ਰੋਟੋਕੋਲ Python SDK ਕਸਟਮ MCP ਸਰਵਰ ਬਣਾਉਣ ਲਈ ਬੁਨਿਆਦ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ। ਤੁਸੀਂ ਵਰਜਨ 1.9.3 ਵਰਤੋਂਗੇ ਜਿਸ ਵਿੱਚ ਡੀਬੱਗਿੰਗ ਸਮਰੱਥਾਵਾਂ ਸੁਧਰੀਆਂ ਹੋਈਆਂ ਹਨ।

### 🔍 MCP Inspector

ਇੱਕ ਸ਼ਕਤੀਸ਼ਾਲੀ ਡੀਬੱਗਿੰਗ ਸੰਦ ਜੋ ਨਿੰਮਲਿਖਤ ਮੁਹੱਈਆ ਕਰਦਾ ਹੈ:  
- ਰੀਅਲ-ਟਾਈਮ ਸਰਵਰ ਨਿਗਰਾਨੀ  
- ਟੂਲ ਚਲਾਉਣ ਦੀ ਦ੍ਰਸ਼ਟੀਕਰਨ  
- ਨੈੱਟਵਰਕ ਬੇਨਤੀ/ਜਵਾਬ ਦੀ ਜਾਂਚ  
- ਇੰਟਰਐਕਟਿਵ ਟੈਸਟਿੰਗ ਵਾਤਾਵਰਨ  

---

## 📖 ਕਦਮ ਦਰ ਕਦਮ ਇੰਪਲੀਮੈਂਟੇਸ਼ਨ

### ਕਦਮ 1: Agent Builder ਵਿੱਚ ਇੱਕ WeatherAgent ਬਣਾਓ

1. VS Code ਵਿੱਚ ਮਾਇਕ੍ਰੋਸਾਫਟ ਫਾਊਂਡਰੀ ਟੂਲਕਿਟ ਦੇ ਵਿਸ਼ਤਾਰ ਰਾਹੀਂ **Agent Builder ਚਲਾਓ**  
2. ਇਸ ਸੰਰਚਨਾ ਦੇ ਨਾਲ **ਨਵਾਂ ਏਜੰਟ ਬਣਾਓ**:  
   - ਏਜੰਟ ਦਾ ਨਾਮ: `WeatherAgent`  

![Agent Creation](../../../../translated_images/pa/Agent.c9c33f6a412b4cde.webp)

### ਕਦਮ 2: MCP ਸਰਵਰ ਪ੍ਰੋਜੈਕਟ ਸ਼ੁਰੂ ਕਰੋ

1. Agent Builder ਵਿੱਚ **ਟੂਲਜ਼** → **Add Tool** 'ਤੇ ਜਾਓ  
2. ਉਪਲਬਧ ਵਿਕਲਪਾਂ ਵਿੱਚੋਂ **"MCP Server"** ਚੁਣੋ  
3. **"Create A new MCP Server"** ਚੁਣੋ  
4. `python-weather` ਟੈਂਪਲੇਟ ਚੁਣੋ  
5. ਆਪਣੇ ਸਰਵਰ ਦਾ ਨਾਮ ਦਿਓ: `weather_mcp`  

![Python Template Selection](../../../../translated_images/pa/Pythontemplate.9d0a2913c6491500.webp)

### ਕਦਮ 3: ਪ੍ਰੋਜੈਕਟ ਖੋਲ੍ਹੋ ਅਤੇ ਜਾਅਜ਼ਾ ਲਵੋ

1. ਤਿਆਰ ਕੀਤਾ ਗਿਆ ਪ੍ਰੋਜੈਕਟ VS Code ਵਿੱਚ ਖੋਲ੍ਹੋ  
2. ਪ੍ਰੋਜੈਕਟ ਦੀ ਬਣਤਰ ਦੀ ਸਮੀਖਿਆ ਕਰੋ:  
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


### ਕਦਮ 4: ਆਪਡੇਟ ਕਰਕੇ ਨਵੀਂ MCP SDK ਵਰਜਨ ਲਓ

> **🔍 ਕਿਉਂ ਅਪਗਰੇਡ ਕਰਨਾ?** ਅਸੀਂ ਸਮਰੱਥਾਵਾਂ ਨੂੰ ਸੁਧਾਰਨ ਅਤੇ ਬਿਹਤਰ ਡੀਬੱਗਿੰਗ ਲਈ ਨਵੀਂ MCP SDK (v1.9.3) ਅਤੇ ਇੰਸਪੈਕਟਰ ਸੇਵਾ (0.14.0) ਵਰਤਣਾ ਚਾਹੁੰਦੇ ਹਾਂ।

#### 4a. Python Dependencies ਅਪਡੇਟ ਕਰੋ

**`pyproject.toml` ਸੋਧੋ:** [./code/weather_mcp/pyproject.toml](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/pyproject.toml) ਨੂੰ ਅਪਡੇਟ ਕਰੋ

#### 4b. Inspector ਸੰਰਚਨਾ ਅਪਡੇਟ ਕਰੋ

**`inspector/package.json` ਸੋਧੋ:** [./code/weather_mcp/inspector/package.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package.json) ਨੂੰ ਅਪਡੇਟ ਕਰੋ

#### 4c. Inspector Dependencies ਅਪਡੇਟ ਕਰੋ

**`inspector/package-lock.json` ਸੋਧੋ:** [./code/weather_mcp/inspector/package-lock.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package-lock.json) ਨੂੰ ਅਪਡੇਟ ਕਰੋ

> **📝 ਨੋਟ:** ਇਸ ਫਾਈਲ ਵਿੱਚ ਵਿਆਪਕ ਡਿਪੈਂਡੇਸੀ ਪਰਿਭਾਸ਼ਾਵਾਂ ਸ਼ਾਮਲ ਹਨ। ਹੇਠਾਂ ਮੁੱਖ ਬਣਤਰ ਦਿੱਤੀ ਗਈ ਹੈ - ਪੂਰੀ ਸਮਗਰੀ ਸਹੀ ਡਿਪੈਂਡੇਸੀ ਨਿਰਧਾਰਣ ਨੂੰ ਯਕੀਨੀ ਬਣਾਉਂਦੀ ਹੈ।

> **⚡ ਪੂਰਾ ਪੈਕੇਜ ਲੌਕ:** ਪੂਰਾ package-lock.json ਲਗਭਗ 3000 ਲਾਈਨਾਂ ਦੀਆਂ ਡਿਪੈਂਡੇਸੀ ਪਰਿਭਾਸ਼ਾਵਾਂ ਸ਼ਾਮਲ ਕਰਦਾ ਹੈ। ਉਪਰੋਕਤ ਢਾਂਚਾ ਮੁੱਖ ਹੈ - ਪੂਰੀ ਡਿਪੈਂਡੇਸੀ ਹੱਲ ਲਈ ਦਿੱਤੀ ਗਈ ਫਾਈਲ ਵਰਤੋ।  

### ਕਦਮ 5: VS Code ਡੀਬੱਗਿੰਗ ਸੰਰਚਨਾ

*ਨੋਟ: ਕਿਰਪਾ ਕਰਕੇ ਦਿੱਤੀ ਗਈ ਫਾਈਲ ਨੂੰ ਦਰਜ ਕੀਤੇ ਪੱਥ 'ਤੇ ਕਾਪੀ ਕਰਕੇ ਸਥਾਨਕ ਫਾਈਲ ਨੂੰ ਬਦਲੋ*

#### 5a. ਲੌਂਚ ਸੰਰਚਨਾ ਅਪਡੇਟ ਕਰੋ

**`.vscode/launch.json` ਸੋਧੋ:**  
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


**`.vscode/tasks.json` ਸੋਧੋ:**  
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

## 🚀 MCP ਸਰਵਰ ਚਲਾਉਣਾ ਅਤੇ ਟੈਸਟ ਕਰਨਾ

### ਕਦਮ 6: ਡਿਪੈਂਡੇਸੀ ਇੰਸਟਾਲ ਕਰੋ

ਸੰਰਚਨਾ ਬਦਲਾਅ ਤੋਂ ਬਾਅਦ ਹੇਠਾਂ ਦਿੱਤੇ ਕਮਾਂਡ ਚਲਾਓ:

**Python ਡਿਪੈਂਡੇਸੀ ਇੰਸਟਾਲ ਕਰੋ:**  
```bash
uv sync
```
  

**Inspector ਡਿਪੈਂਡੇਸੀ ਇੰਸਟਾਲ ਕਰੋ:**  
```bash
cd inspector
npm install
```


### ਕਦਮ 7: Agent Builder ਨਾਲ ਡੀਬੱਗ ਕਰੋ

1. **F5 ਦਬਾਓ** ਜਾਂ **"Debug in Agent Builder"** ਸੰਰਚਨਾ ਵਰਤੋਂ  
2. ਡੀਬੱਗ ਪੈਨਲ ਵਿੱਚੋਂ ਕੰਪਾਊਂਡ ਸੰਰਚਨਾ ਚੁਣੋ  
3. ਸਰਵਰ ਸ਼ੁਰੂ ਹੋਣ ਅਤੇ Agent Builder ਖੁਲਣ ਦਾ ਇੰਤਜ਼ਾਰ ਕਰੋ  
4. ਆਪਣੇ ਮੌਸਮ MCP ਸਰਵਰ ਨੂੰ ਕੁਦਰਤੀ ਭਾਸ਼ਾ ਕੁਇਰੀਆਂ ਨਾਲ ਟੈਸਟ ਕਰੋ  

ਐਸਾ ਪ੍ਰਾਂਪਟ ਦਿਓ

SYSTEM_PROMPT

```
You are my weather assistant
```


USER_PROMPT

```
How's the weather like in Seattle
```


![Agent Builder Debug Result](../../../../translated_images/pa/Result.6ac570f7d2b1d538.webp)

### ਕਦਮ 8: MCP ਇੰਸਪੈਕਟਰ ਨਾਲ ਡੀਬੱਗ ਕਰੋ

1. **"Debug in Inspector"** ਸੰਰਚਨਾ (Edge ਜਾਂ Chrome) ਵਰਤੋਂ  
2. ਇੰਸਪੈਕਟਰ ਇੰਟਰਫੇਸ `http://localhost:6274` 'ਤੇ ਖੋਲ੍ਹੋ  
3. ਇੰਟਰਐਕਟਿਵ ਟੈਸਟਿੰਗ ਵਾਤਾਵਰਨ ਦੀ ਜਾਂਚ ਕਰੋ:  
   - ਉਪਲਬਧ ਟੂਲ ਵੇਖੋ  
   - ਟੂਲ ਚਲਾਉਣ ਦਾ ਟੈਸਟ ਕਰੋ  
   - ਨੈੱਟਵਰਕ ਬੇਨਤੀਆਂ ਦੀ ਨਿਗਰਾਨੀ ਕਰੋ  
   - ਸਰਵਰ ਜਵਾਬ ਡੀਬੱਗ ਕਰੋ  

![MCP Inspector Interface](../../../../translated_images/pa/Inspector.5672415cd02fe873.webp)

---

## 🎯 ਮੁੱਖ ਸਿੱਖਣ ਵਾਲੇ ਨਤੀਜੇ

ਇਸ ਲੈਬ ਨੂੰ ਪੂਰਾ ਕਰਕੇ, ਤੁਹਾਡੇ ਕੋਲ ਹੈ:

- [x] ਮਾਇਕ੍ਰੋਸਾਫਟ ਫਾਊਂਡਰੀ ਟੂਲਕਿਟ ਟੈਂਪਲੇਟ ਦੀ ਵਰਤੋਂ ਕਰਕੇ **ਕਸਟਮ MCP ਸਰਵਰ ਬਣਾਇਆ**  
- [x] ਸੁਧਾਰ ਲਈ ਨਵੀਨਤਮ MCP SDK (v1.9.3) ਵਰਜਨ ਵਿੱਚ **ਅਪਗਰੇਡ ਕੀਤਾ**  
- [x] ਦੋਨਾਂ Agent Builder ਅਤੇ ਇੰਸਪੈਕਟਰ ਲਈ **ਪ੍ਰੋਫੈਸ਼ਨਲ ਡੀਬੱਗਿੰਗ ਵਰਕਫਲੋਜ਼ ਸੰਰਚਿਤ ਕੀਤੇ**  
- [x] ਇੰਟਰਐਕਟਿਵ ਸਰਵਰ ਟੈਸਟਿੰਗ ਲਈ **MCP ਇੰਸਪੈਕਟਰ ਸੈਟਅੱਪ ਕੀਤਾ**  
- [x] MCP ਵਿਕਾਸ ਲਈ **VS Code ਡੀਬੱਗਿੰਗ ਸੰਰਚਨਾ ਦੱਖਲ ਕੀਤੀ**  

## 🔧 ਐਡਵਾਂਸਡ ਫੀਚਰਜ਼ ਦਾ ਪ੍ਰਯੋਗ

| ਫੀਚਰ | ਵੇਰਵਾ | ਵਰਤੋਂ ਦਾ ਕੇਸ |
|---------|-------------|----------|
| **MCP Python SDK v1.9.3** | ਆਧੁਨਿਕ ਪ੍ਰੋਟੋਕੋਲ ਇੰਪਲੀਮੈਂਟੇਸ਼ਨ | ਆਧੁਨਿਕ ਸਰਵਰ ਵਿਕਾਸ |
| **MCP Inspector 0.14.0** | ਇੰਟਰਐਕਟਿਵ ਡੀਬੱਗਿੰਗ ਸੰਦ | ਰੀਅਲ-ਟਾਈਮ ਸਰਵਰ ਟੈਸਟਿੰਗ |
| **VS Code ਡੀਬੱਗਿੰਗ** | ਏਕੀਕ੍ਰਿਤ ਵਿਕਾਸ ਵਾਤਾਵਰਨ | ਪ੍ਰੋਫੈਸ਼ਨਲ ਡੀਬੱਗਿੰਗ ਵਰਕਫਲੋਜ਼ |
| **Agent Builder ਏਕੀਕਰਨ** | ਮਾਇਕ੍ਰੋਸਾਫਟ ਫਾਊਂਡਰੀ ਟੂਲਕਿਟ ਨਾਲ ਸਿੱਧਾ ਕਨੈਕਸ਼ਨ | ਅੰਤ-ਤੱਕ ਏਜੰਟ ਟੈਸਟਿੰਗ |

## 📚 ਵਾਧੂ ਸਰੋਤ

- [MCP Python SDK ਦਸਤਾਵੇਜ਼](https://modelcontextprotocol.io/docs/sdk/python)  
- [ਮਾਇਕ੍ਰੋਸਾਫਟ ਫਾਊਂਡਰੀ ਟੂਲਕਿਟ ਵਧਾਉਣ ਦੀ ਗਾਈਡ](https://code.visualstudio.com/docs/ai/ai-toolkit)  
- [VS Code ਡੀਬੱਗਿੰਗ ਦਸਤਾਵੇਜ਼](https://code.visualstudio.com/docs/editor/debugging)  
- [ਮਾਡਲ ਸੰਦਰਭ ਪ੍ਰੋਟੋਕੋਲ ਨਿਰਦੇਸ਼](https://modelcontextprotocol.io/docs/concepts/architecture)  

---

**🎉 ਮੁਬਾਰਕਾਂ!** ਤੁਸੀਂ ਲੈਬ 3 ਸਫਲਤਾਪੂਰਵਕ ਪੂਰੀ ਕਰ ਲਈ ਹੈ ਅਤੇ ਹੁਣ ਪ੍ਰੋਫੈਸ਼ਨਲ ਵਿਕਾਸ ਵਰਕਫਲੋਜ਼ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਕਸਟਮ MCP ਸਰਵਰ ਬਣਾ, ਡੀਬੱਗ ਅਤੇ ਤਾਇਨਾਤ ਕਰ ਸਕਦੇ ਹੋ।

### 🔜 ਅਗਲੇ ਮਾਡਿਊਲ ਵੱਲ ਵਧੋ

ਆਪਣੀਆਂ MCP ਕੁਸ਼ਲਤਾਵਾਂ ਨੂੰ ਅਸਲੀ ਵਿਕਾਸ ਵਰਕਫਲੋ ਵਿੱਚ ਲਾਗੂ ਕਰਨ ਲਈ ਤਿਆਰ? ਅਗਲੇ ਮਾਡਿਊਲ **[Module 4: Practical MCP Development - Custom GitHub Clone Server](../lab4/README.md)** ਤੇ ਜਾਰੀ ਰੱਖੋ ਜਿੱਥੇ ਤੁਸੀਂ:  
- ਇੱਕ ਉਤਪਾਦਨ-ਤਕਿਆ MCP ਸਰਵਰ ਬਣਾਓ ਜੋ GitHub ਰੀਪੋਜ਼ਿਟਰੀ ਕਾਰਜਾਂ ਨੂੰ ਆਟੋਮੇਟ ਕਰਦਾ ਹੈ  
- MCP ਰਾਹੀਂ GitHub ਰੀਪੋਜ਼ਿਟਰੀ ਕਲੋਨ ਫੰਕਸ਼ਨਾਲਿਟੀ ਨੂੰ ਲਾਗੂ ਕਰੋ  
- VS Code ਅਤੇ GitHub Copilot Agent Mode ਨਾਲ ਕਸਟਮ MCP ਸਰਵਰ ਜੋੜੋ  
- ਕਸਟਮ MCP ਸਰਵਰ ਨੂੰ ਉਤਪਾਦਨ ਵਾਤਾਵਰਨਾਂ ਵਿੱਚ ਟੈਸਟ ਅਤੇ ਤਾਇਨਾਤ ਕਰੋ  
- ਡਿਵੈਲਪਰ ਲਈ ਪ੍ਰੈਟਿਕਲ ਵਰਕਫਲੋ ਆਟੋਮੇਸ਼ਨ ਸਿੱਖੋ  

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ਅਸਵੀਕਾਰੋਪਣ**:
ਇਸ ਦਸਤਾਵੇਜ਼ ਦਾ ਅਨੁਵਾਦ ਏਆਈ ਅਨੁਵਾਦ ਸੇਵਾ [Co-op Translator](https://github.com/Azure/co-op-translator) ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਕੀਤਾ ਗਿਆ ਹੈ। ਜਦੋਂ ਕਿ ਅਸੀਂ ਸਹੀਤਾਵਾਂ ਲਈ ਯਤਨਸ਼ੀਲ ਹਾਂ, ਕਿਰਪਾ ਕਰਕੇ ਧਿਆਨ ਰੱਖੋ ਕਿ ਸਵੈਚਾਲਿਤ ਅਨੁਵਾਦਾਂ ਵਿੱਚ ਗਲਤੀਆਂ ਜਾਂ ਅਸਮੱਤਿਆਵਾਂ ਹੋ ਸਕਦੀਆਂ ਹਨ। ਮੂਲ ਦਸਤਾਵੇਜ਼ ਆਪਣੀ ਮੂਲ ਭਾਸ਼ਾ ਵਿੱਚ ਅਧਿਕਾਰਕ ਸਰੋਤ ਮੰਨਿਆ ਜਾਣਾ ਚਾਹੀਦਾ ਹੈ। ਜਰੂਰੀ ਜਾਣਕਾਰੀ ਲਈ, ਪੇਸ਼ੇਵਰ ਮਨੁੱਖੀ ਅਨੁਵਾਦ ਦੀ ਸਿਫ਼ਾਰਸ਼ ਕੀਤੀ ਜਾਂਦੀ ਹੈ। ਅਸੀਂ ਇਸ ਅਨੁਵਾਦ ਦੇ ਉਪਯੋਗ ਤੋਂ ਪੈਦਾ ਹੋਣ ਵਾਲੀਆਂ ਕਿਸੇ ਵੀ ਗਲਤਫਹਿਮੀਆਂ ਜਾਂ ਗਲਤ ਵਿਆਖਿਆਵਾਂ ਲਈ ਜਵਾਬਦੇਹ ਨਹੀਂ ਹਾਂ।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->