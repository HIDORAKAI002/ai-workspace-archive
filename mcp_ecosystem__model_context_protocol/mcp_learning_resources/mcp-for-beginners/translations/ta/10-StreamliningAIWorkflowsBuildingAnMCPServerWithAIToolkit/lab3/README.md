# 🔧 Module 3: Microsoft Foundry Toolkit உடன் முன்னேற்ற MCP மேம்பாடு

![Duration](https://img.shields.io/badge/Duration-20_minutes-blue?style=flat-square)
![Microsoft Foundry Toolkit](https://img.shields.io/badge/Microsoft_Foundry_Toolkit-Required-orange?style=flat-square)
![Python](https://img.shields.io/badge/Python-3.10+-green?style=flat-square)
![MCP SDK](https://img.shields.io/badge/MCP_SDK-1.9.3-purple?style=flat-square)
![Inspector](https://img.shields.io/badge/MCP_Inspector-0.14.0-blue?style=flat-square)

## 🎯 கற்றலின் நோக்கங்கள்

இந்த ஆய்வகத்தின் இறுதியில், நீங்கள்:
  
- ✅ Microsoft Foundry Toolkit பயன்படுத்தி தனிப்பயன் MCP சேவையகங்களை உருவாக்க முடியும்
- ✅ சமீபத்திய MCP Python SDK (v1.9.3) ஐ கட்டமைத்து பயன்படுத்த முடியும்
- ✅ MCP Inspector ஐ சீர்செய்தல் மூலம் பயன்படுத்த மற்றும் அமைக்க முடியும்
- ✅ Agent Builder மற்றும் Inspector சூழலில் MCP சேவையகங்களை பிழைத்திருத்த முடியும்
- ✅ மேம்பட்ட MCP சேவையக மேம்பாட்டு பணிகள் பற்றிப் புரிந்துகொள்வீர்கள்

## 📋 முன் நிபந்தனைகள்

- ஆய்வகம் 2 (MCP அடிப்படைகள்) முடித்திருத்தல்
- Microsoft Foundry Toolkit நீட்சியுடன் VS Code
- Python 3.10+ சூழல்
- Inspector அமைக்க Node.js மற்றும் npm

## 🏗️ நீங்கள் உருவாக்கப்போகிறீர்கள்

இந்த ஆய்வகத்தில், நீங்கள் **வானிலை MCP சேவையகம்** உருவாக்கப் போகிறீர்கள், இது:

- தனிப்பயன் MCP சேவையக செயலாக்கம்
- Microsoft Foundry Toolkit Agent Builder உடன் ஒருங்கிணைப்பு
- தொழில் நுட்பமான பிழைத்திருத்தும் பணிகள்
- நவீன MCP SDK பயன்படுத்தும் நடைமுறைகள்

---

## 🔧 மைய கூறுகள் அறிமுகம்

### 🐍 MCP Python SDK
Model Context Protocol Python SDK தனிப்பயன் MCP சேவையகங்களை உருவாக்க அடிப்படையாக அமைகிறது. நீங்கள் v1.9.3 பதிப்பைப் பயன்படுத்துவீர்கள், இது மேம்பட்ட பிழைத்திருத்த திறன்களை வழங்குகிறது.

### 🔍 MCP Inspector
ஒரு சக்திவாய்ந்த பிழைத்திருத்தக் கருவி, இது:
- உண்மைக்கால சேவையக கண்காணிப்பு
- கருவி செயல்பாடு காண்க
- நெட்வொர்க் கோரிக்கைகள்/பதில்கள் ஆய்வு
- தொடர்பு கொண்ட சோதனை சூழல்

---

## 📖 படிப்படியாக செயலாக்கம்

### படி 1: Agent Builderல் WeatherAgent உருவாக்கு

1. **Microsoft Foundry Toolkit நீட்சியுடன் VS Codeல் Agent Builder ஆரம்பி**
2. **புதிய ஏஜெண்ட் உருவாக்கு, கீழ்காணும் அமைப்புடன்:**
   - Agent Name: `WeatherAgent`

![Agent Creation](../../../../translated_images/ta/Agent.c9c33f6a412b4cde.webp)

### படி 2: MCP சேவையக திட்டம் துவங்கு

1. **Agent Builderல் Tools → Add Tool வெளியீடு செல்லவும்**
2. **"MCP Server" அபிபிராயத்தைத் தேர்வு செய்யவும்**
3. **"Create A new MCP Server" தேர்வு செய்யவும்**
4. **`python-weather` மாதிரியைத் தேர்வு செய்யவும்**
5. **சேவையகத்தின் பெயர்:** `weather_mcp`

![Python Template Selection](../../../../translated_images/ta/Pythontemplate.9d0a2913c6491500.webp)

### படி 3: திட்டத்தைக் திறந்து ஆராய்க

1. **உருவாக்கப்பட்ட திட்டம் VS Codeல் திறக்கவும்**
2. **திட்ட அமைப்பை ஆய்வு செய்க:**
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

### படி 4: சமீபத்திய MCP SDKக்கு மேம்படுத்து

> **🔍 ஏன் மேம்படுத்த வேண்டும்?** மேம்பட்ட அம்சங்களும் சிறந்த பிழைத்திருத்தச் சிறப்புகளும் கொண்ட சமீபத்திய MCP SDK (v1.9.3) மற்றும் Inspector சேவையை (0.14.0)ப் பயன்படுத்த வேண்டும்.

#### 4a. Python சார்ந்த சார்பு மேம்படுத்தல்

**`pyproject.toml` தொகுப்பு:** [./code/weather_mcp/pyproject.toml](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/pyproject.toml) ஐ மேம்படுத்து


#### 4b. Inspector அமைப்பை மாற்று

**`inspector/package.json` தொகுப்பு:** [./code/weather_mcp/inspector/package.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package.json) ஐ மாற்று

#### 4c. Inspector சார்பு மேம்படுத்தல்

**`inspector/package-lock.json` தொகுப்பு:** [./code/weather_mcp/inspector/package-lock.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package-lock.json) ஐ மாற்று

> **📝 குறிப்பு:** இந்த கோப்பு பெரும் சார்பு வரையறைகளை கொண்டது. கீழே முக்கிய கட்டமைப்பு கொடுக்கப்பட்டுள்ளது - முழு உள்ளடக்கம் சரியான சார்பு தீர்வுக்கு முக்கியம்.


> **⚡ முழு Package Lock:** package-lock.json இல் சுமார் 3000 வரிசைகள் உள்ளன. மேலே உள்ள கட்டமைப்பு முக்கியமானது - முழுமையான தீர்வுக்கு கொடுக்கப்பட்ட கோப்பு பயன்படுத்தவும்.

### படி 5: VS Code பிழைத்திருத்த ஆலக்களை அமைக்கவும்

*குறிப்பு: குறிப்பிடப்பட்ட பாதையில் உள்ள கோப்பைப் பதிலாக உள்ளூர் கோப்பை நகலெடுக்கவும்*

#### 5a. தொடக்கு அமைப்பை மாற்று

**`.vscode/launch.json` தொகுப்பு:**

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

**`.vscode/tasks.json` தொகுப்பு:**

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

## 🚀 உங்கள் MCP சேவையகத்தை இயக்கவும் சோதிக்கவும்

### படி 6: சார்புகளை நிறுவவும்

அமைப்புகளை மாற்றிய பிறகு கீழ்காணும் கட்டளைகளை இயக்கவும்:

**Python சார்புகளை நிறுவவும்:**
```bash
uv sync
```

**Inspector சார்புகளை நிறுவவும்:**
```bash
cd inspector
npm install
```

### படி 7: Agent Builder மூலம் பிழைத்திருத்து

1. **F5 அழுத்தவும் அல்லது "Debug in Agent Builder" கட்டமைப்பைப் பயன்படுத்தவும்**
2. **Debug பட்டியில் கூட்டு கட்டமைப்பைத் தேர்வு செய்யவும்**
3. **சேவையகம் துவங்க மற்றும் Agent Builder திறக்கும் வரை காத்திருக்கவும்**
4. **பொது மொழி கேள்விகளுடனான உங்கள் வானிலை MCP சேவையகத்தை சோதிக்கவும்**

இந்தவாறு உள்ளீடு அளிக்கவும்

SYSTEM_PROMPT

```
You are my weather assistant
```

USER_PROMPT

```
How's the weather like in Seattle
```

![Agent Builder Debug Result](../../../../translated_images/ta/Result.6ac570f7d2b1d538.webp)

### படி 8: MCP Inspector மூலம் பிழைத்திருத்து

1. **"Debug in Inspector" கட்டமைப்பைப் பயன்படுத்தவும் (Edge அல்லது Chrome)**
2. **`http://localhost:6274` இல் Inspector முகப்பை திறக்கவும்**
3. **தொடர்பு கொண்ட சோதனை சூழலை ஆராயவும்:**
   - கிடைக்கக்கூடிய கருவிகளைப் பார்க்கவும்
   - கருவி செயல்பாட்டைப் சோதிக்கவும்
   - நெட்வொர்க் கோரிக்கைகள் கண்காணிப்பு
   - சேவையக பதில்களை பிழைத்திருத்துக

![MCP Inspector Interface](../../../../translated_images/ta/Inspector.5672415cd02fe873.webp)

---

## 🎯 முக்கிய கற்றல் முடிவுகள்

இந்த ஆய்வகத்தை முடித்துவிட்டு, நீங்கள்:

- [x] **Microsoft Foundry Toolkit மாதிரிகள் மூலம் தனிப்பயன் MCP சேவையகத்தை உருவாக்கி உள்ளீர்கள்**
- [x] **மேலதிக செயல்பாடுகளுக்காக சமீபத்திய MCP SDK (v1.9.3) க்கு மேம்படுத்தி உள்ளீர்கள்**
- [x] **Agent Builder மற்றும் Inspector க்கான தொழில் நுட்ப பிழைத்திருத்த பணிகளை அமைத்து உள்ளீர்கள்**
- [x] **MCP Inspector ஐ தொடர்பு கொண்ட சேவையக சோதனைக்காக அமைத்துள்ளீர்கள்**
- [x] **MCP மேம்பாட்டிற்கான VS Code பிழைத்திருத்தக் கட்டமைப்புகளைக் கற்றுள்ளீர்கள்**

## 🔧 முன்னேற்ற அம்சங்கள் ஆராய்வு

| அம்சம் | விளக்கம் | பயன்பாடு |
|---------|-------------|----------|
| **MCP Python SDK v1.9.3** | சமீபத்திய நெறிமுறை செயலாக்கம் | நவீன சேவையக மேம்பாடு |
| **MCP Inspector 0.14.0** | தொடர்பு கொண்ட பிழைத்திருத்த கருவி | உண்மைக்கால சேவையக சோதனை |
| **VS Code Debugging** | ஒருங்கிணைந்த மேம்பாட்டு சூழல் | தொழில் நுட்ப பிழைத்திருத்த பணிகள் |
| **Agent Builder ஒருங்கிணைப்பு** | நேரடி Microsoft Foundry Toolkit இணைப்பு | முழுமையான ஏஜெண்ட் சோதனை |

## 📚 கூடுதல் வளங்கள்

- [MCP Python SDK ஆவணம்](https://modelcontextprotocol.io/docs/sdk/python)
- [Microsoft Foundry Toolkit நீட்சிப் வழிகாட்டி](https://code.visualstudio.com/docs/ai/ai-toolkit)
- [VS Code பிழைத்திருத்த ஆவணம்](https://code.visualstudio.com/docs/editor/debugging)
- [Model Context Protocol விவரக்குறிப்பு](https://modelcontextprotocol.io/docs/concepts/architecture)

---

**🎉 வாழ்த்துக்கள்!** நீங்கள் சுயவிவர MCP சேவையகங்களை தொழில் நுட்ப மேம்பாட்டு பணிகளுடன் உருவாக்கி பிழைத்திருத்தி பிரசுரிப்பதில் திறம்பட முடித்துள்ளீர்கள்.

### 🔜 அடுத்த Moduleக்கு தொடரவும்

உங்கள் MCP திறன்களை நிகழ்கால மேம்பாட்டு பணிக்கு பயன்படுத்தத் தயார் தானா? **[Module 4: Practical MCP Development - Custom GitHub Clone Server](../lab4/README.md)** இல் தொடரவும், நீங்கள்:
- GitHub கருத்தளவைப்பணிகளை தானாகச் செய்ய தயாரான MCP சேவையகத்தை கட்டுங்கள்
- MCP மூலம் GitHub உள்வாங்கல் செயல்பாட்டை செயல்படுத்து
- VS Code மற்றும் GitHub Copilot Agent Mode உடன் தனிப்பயன் MCP சேவையகங்களை ஒருங்கிணைப்பு செய்க
- தனிப்பயன் MCP சேவையகங்களை உற்பத்தி சூழலில் சோதனை செய்து பிரசுரி
- மேம்பாட்டாளர்களுக்கான நடைமுறை வேலைசார்ந்த தானியங்கு கற்றுக் கொள்ளுங்கள்

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**மறுப்பு**:
இந்த ஆவணம் AI மொழிபெயர்ப்பு சேவை [Co-op Translator](https://github.com/Azure/co-op-translator) பயன்படுத்தி மொழிபெயர்க்கப்பட்டுள்ளது. நாங்கள் துல்லியத்திற்காக முயற்சி செய்துள்ளோம், ஆனால் தானாக செய்யப்படும் மொழிபெயர்ப்புகளில் பிழைகள் அல்லது தவறுகள் இருக்கலாம் என்பதை கவனத்தில் கொள்ளவும். அசல் ஆவணம் அதன் தாய்மொழியில் அதிகாரப்பூர்வ ஆதாரமாக கருதப்பட வேண்டும். முக்கியமான தகவல்களுக்கு, தொழில்நுட்பமான மனித மொழிபெயர்ப்பு பரிந்துரைக்கப்படுகிறது. இந்த மொழிபெயர்ப்பைப் பயன்படுத்துவதால் ஏற்படும் எந்த தவறான புரிதல்கள் அல்லது தவறான விளக்கத்திற்கும் நாங்கள் பொறுப்பில்வில்லை.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->