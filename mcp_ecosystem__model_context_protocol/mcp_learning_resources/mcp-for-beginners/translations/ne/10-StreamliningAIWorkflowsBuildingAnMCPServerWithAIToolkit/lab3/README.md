# 🔧 मोड्युल ३: माइक्रोसफ्ट फाउन्ड्री टूलकिटसँग उन्नत MCP विकास

![Duration](https://img.shields.io/badge/Duration-20_minutes-blue?style=flat-square)
![Microsoft Foundry Toolkit](https://img.shields.io/badge/Microsoft_Foundry_Toolkit-Required-orange?style=flat-square)
![Python](https://img.shields.io/badge/Python-3.10+-green?style=flat-square)
![MCP SDK](https://img.shields.io/badge/MCP_SDK-1.9.3-purple?style=flat-square)
![Inspector](https://img.shields.io/badge/MCP_Inspector-0.14.0-blue?style=flat-square)

## 🎯 सिकाइका उद्देश्यहरू

यस ल्याबको अन्त्यसम्म तपाईंले सक्नुहुनेछ:

- ✅ माइक्रोसफ्ट फाउन्ड्री टूलकिट प्रयोग गरेर कस्टम MCP सर्भरहरू सिर्जना गर्न
- ✅ नयाँतम MCP Python SDK (v1.9.3) कन्फिगर र प्रयोग गर्न
- ✅ डिबगिङका लागि MCP Inspector सेट अप र उपयोग गर्न
- ✅ Agent Builder र Inspector दुवै वातावरणमा MCP सर्भरहरू डिबग गर्न
- ✅ उन्नत MCP सर्भर विकास कार्यप्रवाहहरू बुझ्न

## 📋 पूर्वआवश्यकताहरू

- ल्याब २ (MCP आधारभूत ज्ञान) पूरा गरेको हुनु पर्ने
- माइक्रोसफ्ट फाउन्ड्री टूलकिट एक्सटेन्सन सहित VS Code
- Python 3.10+ वातावरण
- Inspector सेटअपका लागि Node.js र npm

## 🏗️ तपाईंले के बनाउनुहुनेछ

यस ल्याबमा, तपाईंले **Weather MCP Server** सिर्जना गर्नुहुनेछ जसले देखाउँछ:
- कस्टम MCP सर्भर कार्यान्वयन
- माइक्रोसफ्ट फाउन्ड्री टूलकिट Agent Builder सँग एकीकरण
- व्यावसायिक डिबगिङ कार्यप्रवाहहरु
- आधुनिक MCP SDK प्रयोग गर्ने तरिका

---

## 🔧 प्रमुख कम्पोनेन्टहरूको अवलोकन

### 🐍 MCP Python SDK
Model Context Protocol Python SDK कस्टम MCP सर्भरहरू बनाउने आधार हो। तपाईंले संस्करण 1.9.3 प्रयोग गर्नुहुनेछ जसमा डिबगिङ क्षमताहरू थप छन्।

### 🔍 MCP Inspector
एक शक्तिशाली डिबगिङ उपकरण जसले प्रदान गर्छ:
- वास्तविक-समय सर्भर निरीक्षण
- उपकरण कार्यान्वयन दृश्यावलोकन
- नेटवर्क अनुरोध/प्रतिक्रिया निरीक्षण
- अन्तरक्रियात्मक परीक्षण वातावरण

---

## 📖 चरण-द्वारा-चरण कार्यान्वयन

### चरण 1: Agent Builder मा WeatherAgent सिर्जना गर्नुहोस्

1. **Agent Builder सुरु गर्नुहोस्** VS Code मा माइक्रोसफ्ट फाउन्ड्री टूलकिट एक्सटेन्सनबाट
2. **नयाँ एजेन्ट सिर्जना गर्नुहोस्** निम्न विन्याससहित:
   - एजेन्ट नाम: `WeatherAgent`

![Agent Creation](../../../../translated_images/ne/Agent.c9c33f6a412b4cde.webp)

### चरण 2: MCP सर्भर परियोजना प्रारम्भ गर्नुहोस्

1. **Agent Builder मा Tools → Add Tool जानुहोस्**
2. **"MCP Server" छनोट गर्नुहोस्**
3. **"Create A new MCP Server" छान्नुहोस्**
4. **`python-weather` टेम्प्लेट चयन गर्नुहोस्**
5. **तपाईंको सर्भरको नाम राख्नुहोस्:** `weather_mcp`

![Python Template Selection](../../../../translated_images/ne/Pythontemplate.9d0a2913c6491500.webp)

### चरण 3: परियोजना खोल्नुहोस् र परीक्षण गर्नुहोस्

1. **VS Code मा सिर्जित परियोजना खोल्नुहोस्**
2. **परियोजनाको संरचना समीक्षा गर्नुहोस्:**
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

### चरण 4: नयाँतम MCP SDK मा अपग्रेड गर्नुस्

> **🔍 किन अपग्रेड गर्ने?** हामी नयाँतम MCP SDK (v1.9.3) र Inspector सेवा (0.14.0) प्रयोग गर्न चाहन्छौं राम्रो सुविधाहरू र डिबगिङ क्षमताहरूको लागि।

#### 4a. Python निर्भरता अपडेट गर्ने

**`pyproject.toml` सम्पादन गर्नुहोस्:** अपडेट गर्नुहोस् [./code/weather_mcp/pyproject.toml](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/pyproject.toml)

#### 4b. Inspector कन्फिगरेसन अपडेट गर्ने

**`inspector/package.json` सम्पादन गर्नुहोस्:** अपडेट गर्नुहोस् [./code/weather_mcp/inspector/package.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package.json)

#### 4c. Inspector निर्भरता अपडेट गर्ने

**`inspector/package-lock.json` सम्पादन गर्नुहोस्:** अपडेट गर्नुहोस् [./code/weather_mcp/inspector/package-lock.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package-lock.json)

> **📝 नोट:** यस फाइलमा धेरै निर्भरता परिभाषाहरू छन्। तल मुख्य संरचना दिइएको छ - पूर्ण सामग्रीले निर्भरता समाधान सुनिश्चित गर्छ।

> **⚡ पूर्ण प्याकेज लक:** पूर्ण package-lock.json मा लगभग ३००० लाइन निर्भरता परिभाषाहरू छन्। माथिको उदाहरणले मुख्य संरचना देखाउँछ - आधिकारिक फाइल प्रयोग गर्नुहोस् पूर्ण निर्भरता समाधानको लागि।

### चरण 5: VS Code डिबगिङ कन्फिगरेसन सेटअप गर्ने

*नोट: कृपया निर्दिष्ट पथमा फाइललाई आफ्नो स्थानीय फाइल प्रतिस्थापन गर्न कपी गर्नुस्*

#### 5a. लन्च कन्फिगरेसन अपडेट गर्ने

**`.vscode/launch.json` सम्पादन गर्नुहोस्:**

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

**`.vscode/tasks.json` सम्पादन गर्नुहोस्:**

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

## 🚀 तपाईंको MCP सर्भर चलाउने र परीक्षण गर्ने

### चरण 6: निर्भरता स्थापना गर्नुहोस्

कन्फिगरेसन परिवर्तनपछि तलका आदेशहरू चलाउनुहोस्:

**Python निर्भरता स्थापना:**
```bash
uv sync
```

**Inspector निर्भरता स्थापना:**
```bash
cd inspector
npm install
```


### चरण 7: Agent Builder मा डिबग गर्ने

1. **F5 थिच्नुहोस्** वा **"Debug in Agent Builder"** कन्फिगरेसन प्रयोग गर्नुहोस्
2. **Debug प्यानलबाट कम्पाउन्ड कन्फिगरेसन चयन गर्नुहोस्**
3. **सर्भर सुरु हुन र Agent Builder खोलिन कुर्नुहोस्**
4. **तपाईंको weather MCP सर्भर प्राकृतिक भाषा सोधपुछसँग परीक्षण गर्नुहोस्**

यो जस्तै इनपुट दिनुहोस्

SYSTEM_PROMPT

```
You are my weather assistant
```

USER_PROMPT

```
How's the weather like in Seattle
```

![Agent Builder Debug Result](../../../../translated_images/ne/Result.6ac570f7d2b1d538.webp)

### चरण 8: MCP Inspector सँग डिबग गर्ने

1. **"Debug in Inspector"** कन्फिगरेसन प्रयोग गर्नुहोस् (Edge वा Chrome)
2. **Inspector इन्टरफेस खोल्नुहोस्** `http://localhost:6274` मा
3. **अन्तरक्रियात्मक परीक्षण वातावरण अन्वेषण गर्नुहोस्:**
   - उपलब्ध उपकरणहरू हेर्नुहोस्
   - उपकरण कार्यान्वयन परीक्षण गर्नुहोस्
   - नेटवर्क अनुरोधहरू अनुगमन गर्नुहोस्
   - सर्भर प्रतिक्रियाहरू डिबग गर्नुहोस्

![MCP Inspector Interface](../../../../translated_images/ne/Inspector.5672415cd02fe873.webp)

---

## 🎯 महत्वपूर्ण सिकाइ परिणामहरू

यस ल्याब पूरा गरेर, तपाईंले:

- [x] **माइक्रोसफ्ट फाउन्ड्री टूलकिट टेम्प्लेटहरू प्रयोग गरेर कस्टम MCP सर्भर सिर्जना गर्नुभएको छ**
- [x] **नयाँतम MCP SDK (v1.9.3) मा अपग्रेड गर्नुभयो उच्च क्षमताको लागि**
- [x] **Agent Builder र Inspector दुवैको लागि व्यावसायिक डिबगिङ कार्यप्रवाहहरू कन्फिगर गर्नुभयो**
- [x] **अन्तरक्रियात्मक सर्भर परीक्षणका लागि MCP Inspector सेट अप गर्नुभयो**
- [x] **MCP विकासका लागि VS Code डिबगिङ कन्फिगरेसनहरूमा दक्ष हुनुभयो**

## 🔧 उन्नत सुविधाहरू अन्वेषण

| सुविधा | वर्णन | प्रयोग केस |
|---------|-------------|----------|
| **MCP Python SDK v1.9.3** | नयाँतम प्रोटोकल कार्यान्वयन | आधुनिक सर्भर विकास |
| **MCP Inspector 0.14.0** | अन्तरक्रियात्मक डिबगिङ उपकरण | वास्तविक-समय सर्भर परीक्षण |
| **VS Code Debugging** | एकीकृत विकास वातावरण | व्यावसायिक डिबगिङ कार्यप्रवाह |
| **Agent Builder Integration** | सिधा माइक्रोसफ्ट फाउन्ड्री टूलकिट जडान | सम्पूर्ण एजेन्ट परीक्षण |

## 📚 थप स्रोतहरू

- [MCP Python SDK Documentation](https://modelcontextprotocol.io/docs/sdk/python)
- [Microsoft Foundry Toolkit Extension Guide](https://code.visualstudio.com/docs/ai/ai-toolkit)
- [VS Code Debugging Documentation](https://code.visualstudio.com/docs/editor/debugging)
- [Model Context Protocol Specification](https://modelcontextprotocol.io/docs/concepts/architecture)

---

**🎉 बधाई छ!** तपाईंले सफलतापूर्वक ल्याब ३ पूरा गर्नुभयो र अहिले पेशेवर विकास कार्यप्रवाहहरू प्रयोग गरेर कस्टम MCP सर्भरहरू सिर्जना, डिबग र तैनाथ गर्न सक्षम हुनुहुन्छ।

### 🔜 अर्को मोड्युलमा अघि बढ्नुहोस्

के तपाईं आफ्नो MCP सीपलाई वास्तविक विकास कार्यप्रवाहमा प्रयोग गर्न तयार हुनुहुन्छ? जानुहोस् **[मोड्युल ४: व्यावहारिक MCP विकास - कस्टम GitHub क्लोन सर्भर](../lab4/README.md)** जहाँ तपाईंले:
- उत्पादन-तयार MCP सर्भर बनाउनुहुनेछ जसले GitHub रिपोजिटोरी अपरेसनहरू स्वचालित गर्दछ
- MCP मार्फत GitHub रिपोजिटोरी क्लोनिंग कार्यक्षमता कार्यान्वयन गर्नुहोस्
- कस्टम MCP सर्भरहरू VS Code र GitHub Copilot Agent Mode सँग एकीकृत गर्नुहोस्
- उत्पादन वातावरणमा कस्टम MCP सर्भरहरू परीक्षण र तैनाथ गर्नुहोस्
- विकासकर्ताहरूका लागि व्यावहारिक कार्यप्रवाह स्वचालन सिक्नुहोस्

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
यो दस्तावेज़ AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) प्रयोग गरेर अनुवाद गरिएको हो। हामी सही हुन प्रयास गर्छौं, तर कृपया जानकार हुनुस् कि स्वचालित अनुवादमा त्रुटिहरू वा अशुद्धताहरू हुन सक्छन्। मूल दस्तावेज़ यसको मूल भाषामा आधिकारिक स्रोत मानिनुपर्छ। महत्वपूर्ण जानकारीका लागि व्यावसायिक मानव अनुवाद सिफारिस गरिन्छ। यस अनुवादको प्रयोगबाट उत्पन्न कुनै पनि गलत बुझाइ वा त्रुटिको लागि हामी जिम्मेवार छैनौं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->