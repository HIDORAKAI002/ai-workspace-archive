# 🔧 మాడ్యూల్ 3: Microsoft Foundry Toolkit తో ఆధునిక MCP అభివృద్ధి

![సమయం](https://img.shields.io/badge/Duration-20_minutes-blue?style=flat-square)
![Microsoft Foundry Toolkit](https://img.shields.io/badge/Microsoft_Foundry_Toolkit-Required-orange?style=flat-square)
![Python](https://img.shields.io/badge/Python-3.10+-green?style=flat-square)
![MCP SDK](https://img.shields.io/badge/MCP_SDK-1.9.3-purple?style=flat-square)
![ఇన్స్పెక్టర్](https://img.shields.io/badge/MCP_Inspector-0.14.0-blue?style=flat-square)

## 🎯 అభ్యాస లక్ష్యాలు

ఈ ప్రయోగ శాల ముగింపు వరకు, మీరు చేయగలుగుతారు:

- ✅ Microsoft Foundry Toolkit ఉపయోగించి కస్టమ్ MCP సర్వర్లను సృష్టించడం
- ✅ తాజా MCP Python SDK (v1.9.3) కాన్ఫిగర్ చేయడం మరియు ఉపయోగించడం
- ✅ డీబగ్గింగ్ కొరకు MCP Inspector అమర్చడం మరియు ఉపయోగించడం
- ✅ Agent Builder మరియు Inspector వాతావరణాలలో MCP సర్వర్లను డీబగ్గ్ చేయడం
- ✅ ఆధునిక MCP సర్వర్ అభివృద్ధి వర్క్‌ఫ్లోలను అర్థం చేసుకోవడం

## 📋 ముందస్తు అవసరాలు

- ల్యాబ్ 2 (MCP మౌలికాలు) పూర్తి చేయడం
- VS Code లో Microsoft Foundry Toolkit విస్తరణ ఇన్స్టాల్ అయి ఉండాలి
- Python 3.10+ వాతావరణం
- ఇన్స్పెక్టర్ సెటప్ కొరకు Node.js మరియు npm

## 🏗️ మీరు సృష్టించబోయేది

ఈ ప్రయోగశాలలో, మీరు ఒక **వెదర్ MCP సర్వర్** సృష్టిస్తారు, ఇది చూపిస్తుంది:
- కస్టమ్ MCP సర్వర్ అమలుచేయడం
- Microsoft Foundry Toolkit Agent Builder తో సమ్వదింపు
- ప్రొఫెషనల్ డీబగ్గింగ్ వర్క్‌ఫ్లోలు
- ఆధునిక MCP SDK ఉపయోగ విధానాలు

---

## 🔧 ప్రాధమిక భాగాలు సమీక్ష

### 🐍 MCP Python SDK  
మోడల్ కాన్టెక్స్ట్ ప్రోటోకాల్ Python SDK కస్టమ్ MCP సర్వర్లను నిర్మించడానికి పునాదిగా ఉంటుంది. మీరు వర్షన్ 1.9.3 ను అధిక డీబగ్గింగ్ సామర్ధ్యాలతో ఉపయోగిస్తారు.

### 🔍 MCP ఇన్స్పెక్టర్  
మजबూతైన డీబగ్గింగ్ సాధనం ఇది:
- రియల్-టైమ్ సర్వర్ మానిటరింగ్
- టూల్ అమలును చూపించటం
- నెట్‌వర్క్ రిక్వెస్ట్/రిలైస్ తనిఖీ
- ఇంటరాక్టివ్ టెస్టింగ్ వాతావరణం

---

## 📖 దశ-దశ అమలు

### దశ 1: Agent Builder లో WeatherAgent సృష్టించండి

1. VS Code లో Microsoft Foundry Toolkit విస్తరణ ద్వారా **Agent Builder ప్రారంభించండి**
2. క్రింది కాన్ఫిగరేషన్ తో **ఒక కొత్త ఏజెంట్‌ ను సృష్టించండి**:
   - ఏజెంట్ పేరు: `WeatherAgent`

![Agent Creation](../../../../translated_images/te/Agent.c9c33f6a412b4cde.webp)

### దశ 2: MCP సర్వర్ ప్రాజెక్ట్ ప్రారంభించండి

1. Agent Builder లో **Tools → Add Tool** కి వెళ్లండి
2. అందుబాటులో ఉన్న ఎంపికల నుండి **"MCP Server"** ఎంచుకోండి
3. **"Create A new MCP Server"** ఎంచుకోండి
4. **`python-weather` టెంప్లేట్ ఎంచుకోండి**
5. సర్వర్‌కు పేరు పెట్టండి: `weather_mcp`

![Python Template Selection](../../../../translated_images/te/Pythontemplate.9d0a2913c6491500.webp)

### దశ 3: ప్రాజెక్ట్ ఓపెన్ చేసి పరిశీలించండి

1. VS Code లో సాధించబడిన ప్రాజెక్ట్ ఓపెన్ చేయండి  
2. ప్రాజెక్ట్ నిర్మాణాన్ని సమీక్షించండి:  
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
  
### దశ 4: తాజా MCP SDK కు అప్డేట్ చేయండి

> **🔍 ఎందుకు అప్డేట్ చేయాలి?** తాజా MCP SDK (v1.9.3) మరియు ఇన్స్పెక్టర్ సేవ (0.14.0) ఉపయోగించి మెరుగైన ఫీచర్లు మరియు బెటర్ డీబగ్గింగ్ సామర్ధ్యాలు అందుకోవడానికి.

#### 4a. Python డిపెండెన్సీలను అప్డేట్ చేయండి

**`pyproject.toml` సవరించండి:** [./code/weather_mcp/pyproject.toml](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/pyproject.toml) అప్డేట్ చేయండి


#### 4b. ఇన్స్పెక్టర్ కాన్ఫిగరేషన్ అనుసంధానం

**`inspector/package.json` సవరించండి:** [./code/weather_mcp/inspector/package.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package.json) అప్డేట్ చేయండి

#### 4c. ఇన్స్పెక్టర్ డిపెండెన్సీలను అప్డేట్ చేయండి

**`inspector/package-lock.json` సవరించండి:** [./code/weather_mcp/inspector/package-lock.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package-lock.json) అప్డేట్ చేయండి

> **📝 గమనిక:** ఈ ఫైల్ విస్తృతమైన డిపెండెన్సీ నిర్వచనాల్ని కలిగి ఉంటుంది. క్రింద చూపినది ముఖ్యమైన నిర్మాణం మాత్రమే - పూర్తిగా డిపెండెన్సీ పరిష్కారం కోసం పూర్తిగా చూడండి.

> **⚡ పూర్తి ప్యాకేజ్ లాక్:** పూర్తి package-lock.json దాదాపుగా 3000 లైన్ల డిపెండెన్సీ నిర్వచనాలు కలిగి ఉంది. పై నిర్మాణం కీలక మాడ్యూల్స్ చూపిస్తుంది - పూర్తి పరిష్కారం కోసం అందించిన ఫైల్ ఉపయోగించండి.

### దశ 5: VS Code డీబగ్గింగ్ కాన్ఫిగరేషన్

*గమనిక: ప్రత్యేక పాత్ లోని ఫైలును కాపీ చేసి స్థానిక ఫైలును మార్చండి*

#### 5a. లాంచ్ కాన్ఫిగరేషన్ అప్డేట్ చేయండి

**`.vscode/launch.json` సవరించండి:**

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
  
**`.vscode/tasks.json` సవరించండి:**

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

## 🚀 మీ MCP సర్వర్ నడపడం మరియు పరీక్షించండి

### దశ 6: డిపెండెన్సీలు ఇన్స్టాల్ చేయండి

కాన్ఫిగరేషన్ మార్పులు చేసిన తర్వాత ఈ కమాండ్లు నడిపండి:

**Python డిపెండెన్సీలు ఇన్స్టాల్ చేయండి:**
```bash
uv sync
```
  
**ఇన్స్పెక్టర్ డిపెండెన్సీలు ఇన్స్టాల్ చేయండి:**
```bash
cd inspector
npm install
```
  

### దశ 7: Agent Builder తో డీబగ్గింగ్ చేయండి

1. **F5 నొక్కండి** లేదా **"Debug in Agent Builder"** కాన్ఫిగరేషన్ ఉపయోగించండి  
2. డీబగ్ ప్యానెల్ నుండి కాంపౌండ్ కాన్ఫిగరేషన్ ఎంచుకోండి  
3. సర్వర్ మొదలయ్యే వరకు వేచి ఉండండి మరియు Agent Builder తెరవబడుతుంది  
4. సహజ భాష ప్రశ్నలతో మీ వెదర్ MCP సర్వర్ ని పరీక్షించండి  

ఇన్‌పుట్ ప్రాంప్ట్ ఇలాగಿರాలి  

SYSTEM_PROMPT  

```
You are my weather assistant
```
  
USER_PROMPT  

```
How's the weather like in Seattle
```
  
![Agent Builder Debug Result](../../../../translated_images/te/Result.6ac570f7d2b1d538.webp)

### దశ 8: MCP ఇన్స్పెక్టర్ తో డీబగ్గింగ్ చేయండి

1. **"Debug in Inspector"** కాన్ఫిగరేషన్ ఉపయోగించండి (Edge లేదా Chrome)  
2. `http://localhost:6274` వద్ద ఇన్స్పెక్టర్ ఇంటర్‌ఫేస్ తెరవండి  
3. ఇంటరాక్టివ్ టెస్టింగ్ వాతావరణాన్ని అన్వేషించండి:  
   - అందుబాటులో ఉన్న టూల్స్ చూడండి  
   - టూల్ అమలు పరీక్షించండి  
   - నెట్‌వర్క్ రిక్వెస్ట్‌లు వీక్షించండి  
   - సర్వర్ స్పందనలను డీబగ్గ్ చేయండి  

![MCP Inspector Interface](../../../../translated_images/te/Inspector.5672415cd02fe873.webp)

---

## 🎯 ముఖ్య అభ్యాస ఫలితాలు

ఈ ప్రయోగశాల పూర్తి చేసిన తరువాత, మీరు:

- [x] Microsoft Foundry Toolkit టెంప్లేట్లు ఉపయోగించి **కస్టమ్ MCP సర్వర్ సృష్టించార**  
- [x] మెరుగైన ఫంక్షనాలిటీకి తాజా MCP SDK (v1.9.3) కి **అప్గ్రేడ్ చేసారు**  
- [x] Agent Builder మరియు ఇన్స్పెక్టర్ రెండింటికీ **ప్రొఫెషనల్ డీబగ్గింగ్ వర్క్‌ఫ్లోలను కాన్ఫిగర్ చేసారు**  
- [x] ఇంటరాక్టివ్ సర్వర్ టెస్టింగ్ కోసం **MCP Inspector అమర్చారు**  
- [x] MCP అభివృద్ధి కోసం VS Code డీబగ్గింగ్ కాన్ఫిగరేషన్లను **నైపుణ్యం తో నేర్చుకున్నారు**

## 🔧 అధ్యಯన ఫీచర్లు

| ఫీచర్ | వివరణ | వాడుక దృష్టాంతం |
|---------|-------------|----------|
| **MCP Python SDK v1.9.3** | తాజా ప్రోటోకాల్ అమలుచేయడం | ఆధునిక సర్వర్ అభివృద్ధి |
| **MCP Inspector 0.14.0** | ఇంటరాక్టివ్ డీబగ్గింగ్ సాధనం | రియల్-టైమ్ సర్వర్ పరీక్ష |
| **VS Code డీబగ్గింగ్** | సమగ్ర అభివృద్ధి వాతావరణం | ప్రొఫెషనల్ డీబగ్గింగ్ వర్క్‌ఫ్లో |
| **Agent Builder ఇన్టిగ్రేషన్** | Microsoft Foundry Toolkit నేరుగా కనెక్ట్ | ఆఖరి నుండి ఆఖరి ఏజెంట్ పరీక్ష |

## 📚 అదనపు వనరులు

- [MCP Python SDK డాక్యుమెంటేషన్](https://modelcontextprotocol.io/docs/sdk/python)  
- [Microsoft Foundry Toolkit విస్తరణ గైడ్](https://code.visualstudio.com/docs/ai/ai-toolkit)  
- [VS Code డీబగ్గింగ్ డాక్యుమెంటేషన్](https://code.visualstudio.com/docs/editor/debugging)  
- [మోడల్ కాన్టెక్స్ట్ ప్రోటోకాల్ స్పెసిఫికేషన్](https://modelcontextprotocol.io/docs/concepts/architecture)

---

**🎉 అభినందనలు!** మీరు విజయవంతంగా ల్యాబ్ 3 పూర్తి చేసారు మరియు ప్రొఫెషనల్ అభివృద్ధి వర్క్‌ఫ్లోలు ఉపయోగించి కస్టమ్ MCP సర్వర్లను సృష్టించడం, డీబగ్గింగ్, అమలు చేయడం నేర్చుకున్నారు.

### 🔜 తదుపరి మాడ్యూల్ కు కొనసాగండి

మీ MCP నైపుణ్యాలను నిజ జీవిత అభివృద్ధి వర్క్‌ఫ్లోకు వర్తింపజేసేందుకు సిద్దమా? కొనసాగండి **[మాడ్యూల్ 4: ప్రయోగాత్మక MCP అభివృద్ధి - కస్టమ్ GitHub క్లోన్ సర్వర్](../lab4/README.md)** వద్ద, అక్కడ మీరు:  
- GitHub రిపాజిటరీ కార్యకలాపాలను ఆటోమేటింగ్ చేసే ప్రొడక్షన్-ప్రిపేర్డ్ MCP సర్వర్ నిర్మించుకుంటారు  
- MCP ద్వారా GitHub రిపాజిటరీ క్లోనింగ్ ఫంక్షనాలిటీ అమలు చేస్తారు  
- కస్టమ్ MCP సర్వర్లను VS Code మరియు GitHub Copilot Agent Mode తో సమ్వదింప చేస్తారు  
- ప్రొడక్షన్ వాతావరణాల్లో కస్టమ్ MCP సర్వర్లను పరీక్షించి అమలు చేస్తారు  
- అభివృద్ధికర్తల కోసం ప్రాక్టికల్ వర్క్‌ఫ్లో ఆటోమెషన్ నేర్చుకుంటారు

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**అస్వీకరణ**:
ఈ పత్రం AI అనువాద సేవ [Co-op Translator](https://github.com/Azure/co-op-translator) ఉపయోగించి అనువదించబడింది. మేము ఖచ్చితత్వానికి ప్రయత్నిస్తున్నప్పటికీ, ఆటోమేటెడ్ అనువాదాలు తప్పులు లేదా అసమగ్రతలను కలిగి ఉండవచ్చు. దాని స్వదేశ భాషలో ఉన్న అసలు పత్రాన్ని అధికారం కలిగిన మూలంగా పరిగణించాలి. కీలకమైన సమాచారం కోసం, ప్రొఫెషనల్ మానవ అనువాదాన్ని సిఫారసు చేస్తాము. ఈ అనువాదం ఉపయోగం వల్ల కలిగే ఏవైనా అపార్థాలు లేదా తప్పుదారులు కోసం మేము బాధ్యత వహించము.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->