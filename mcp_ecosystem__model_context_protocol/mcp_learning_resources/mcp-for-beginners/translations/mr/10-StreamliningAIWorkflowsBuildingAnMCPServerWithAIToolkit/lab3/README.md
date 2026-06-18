# 🔧 मॉड्यूल 3: Microsoft Foundry Toolkit सह प्रगत MCP विकास

![Duration](https://img.shields.io/badge/Duration-20_minutes-blue?style=flat-square)
![Microsoft Foundry Toolkit](https://img.shields.io/badge/Microsoft_Foundry_Toolkit-Required-orange?style=flat-square)
![Python](https://img.shields.io/badge/Python-3.10+-green?style=flat-square)
![MCP SDK](https://img.shields.io/badge/MCP_SDK-1.9.3-purple?style=flat-square)
![Inspector](https://img.shields.io/badge/MCP_Inspector-0.14.0-blue?style=flat-square)

## 🎯 शिक्षण उद्दिष्टे

या लॅबच्या शेवटी, तुम्ही सक्षम असाल:

- ✅ Microsoft Foundry Toolkit वापरून कस्टम MCP सर्व्हर तयार करणे
- ✅ नवीनतम MCP Python SDK (v1.9.3) कॉन्फिगर आणि वापरणे
- ✅ डीबगिंगसाठी MCP Inspector सेटअप आणि वापरणे
- ✅ Agent Builder आणि Inspector वातावरणांमध्ये MCP सर्व्हर डीबग करणे
- ✅ प्रगत MCP सर्व्हर विकास कार्यप्रवाह समजून घेणे

## 📋 पूर्वअट

- लॅब 2 (MCP मूलतत्त्वे) पूर्ण करणे
- Microsoft Foundry Toolkit विस्तारासह VS Code
- Python 3.10+ वातावरण
- Inspector सेटअपने Node.js आणि npm

## 🏗️ तुम्ही काय तयार कराल

या लॅबमध्ये, तुम्ही एक **Weather MCP Server** तयार कराल जो दर्शवतो:
- कस्टम MCP सर्व्हरची अंमलबजावणी
- Microsoft Foundry Toolkit Agent Builder सह एकत्रीकरण
- व्यावसायिक डीबगिंग कार्यप्रवाह
- आधुनिक MCP SDK वापर पद्धती

---

## 🔧 कोअर घटकांचे आढावा

### 🐍 MCP Python SDK
Model Context Protocol Python SDK कस्टम MCP सर्व्हर तयार करण्यासाठी पाया पुरवतो. तुम्ही v1.9.3 आवृत्ती वापराल ज्यात सुधारित डीबगिंग क्षमता आहेत.

### 🔍 MCP Inspector
एका शक्तिशाली डीबगिंग टूल जी प्रदान करते:
- रिअल-टाइम सर्व्हर मॉनिटरिंग
- टूल एक्झिक्युसनचे दृश्यांकन
- नेटवर्क विनंत्या/प्रतिक्रिया तपासणी
- परस्परसंवादी चाचणी वातावरण

---

## 📖 टप्प्याटप्प्याने अंमलबजावणी

### टप्पा 1: Agent Builder मध्ये WeatherAgent तयार करा

1. **VS Code मध्ये Microsoft Foundry Toolkit विस्ताराद्वारे Agent Builder सुरू करा**
2. **खालील कॉन्फिगरेशनसह नवीन एजंट तयार करा:**
   - एजंट नाव: `WeatherAgent`

![Agent Creation](../../../../translated_images/mr/Agent.c9c33f6a412b4cde.webp)

### टप्पा 2: MCP Server प्रोजेक्ट सुरू करा

1. **Agent Builder मध्ये Tools → Add Tool वर जा**
2. **उपलब्ध पर्यायांमधून "MCP Server" निवडा**
3. **"Create A new MCP Server" निवडा**
4. **`python-weather` टेम्प्लेट निवडा**
5. **तुमच्या सर्व्हरचे नाव द्या:** `weather_mcp`

![Python Template Selection](../../../../translated_images/mr/Pythontemplate.9d0a2913c6491500.webp)

### टप्पा 3: प्रोजेक्ट उघडा आणि तपासा

1. **VS Code मध्ये तयार केलेला प्रोजेक्ट उघडा**
2. **प्रोजेक्ट संरचना पुनरावलोकन करा:**
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

### टप्पा 4: नवीनतम MCP SDK मध्ये अपग्रेड करा

> **🔍 का अपग्रेड करावे?** आम्हाला सुधारित वैशिष्ट्ये आणि डीबगिंग क्षमतांसाठी नवीनतम MCP SDK (v1.9.3) आणि Inspector सेवा (0.14.0) वापरायची आहे.

#### 4a. Python Dependencies अपडेट करा

**`pyproject.toml` संपादित करा:** [./code/weather_mcp/pyproject.toml](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/pyproject.toml) अपडेट करा


#### 4b. Inspector कॉन्फिगरेशन अपडेट करा

**`inspector/package.json` संपादित करा:** [./code/weather_mcp/inspector/package.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package.json) अपडेट करा

#### 4c. Inspector Dependencies अपडेट करा

**`inspector/package-lock.json` संपादित करा:** [./code/weather_mcp/inspector/package-lock.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package-lock.json) अपडेट करा

> **📝 टीप:** या फाइलमध्ये विस्तृत dependency 정의 आहेत. खाली मूलभूत संरचना दिली आहे - संपूर्ण सामग्री योग्य dependency समाधान सुनिश्चित करते.

> **⚡ फुल पॅकेज लॉक:** संपूर्ण package-lock.json मध्ये अंदाजे 3000 ओळीच्या dependency परिभाषा आहेत. वरील महत्त्वाचे संरचनाच दर्शवते - संपूर्ण dependency समाधानासाठी दिलेली फाइल वापरा.

### टप्पा 5: VS Code डीबगिंग कॉन्फिगर करा

*टीप: कृपया निर्दिष्ट केलेल्या मार्गातील फाइल कॉपी करून स्थानिक फाइल बदलून टाका*

#### 5a. Launch कॉन्फिगरेशन अपडेट करा

**`.vscode/launch.json` संपादित करा:**

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

**`.vscode/tasks.json` संपादित करा:**

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

## 🚀 तुमचा MCP सर्व्हर चालवा आणि टेस्ट करा

### टप्पा 6: Dependencies इन्स्टॉल करा

कॉन्फिगरेशन बदल केल्यानंतर, खालील आदेश चालवा:

**Python dependencies इन्स्टॉल करा:**
```bash
uv sync
```

**Inspector dependencies इन्स्टॉल करा:**
```bash
cd inspector
npm install
```

### टप्पा 7: Agent Builder मध्ये डीबग करा

1. **F5 दाबा किंवा "Debug in Agent Builder" कॉन्फिगरेशन वापरा**
2. **डीबग पॅनेलमधून compound कॉन्फिगरेशन निवडा**
3. **सर्व्हर सुरू होईपर्यंत आणि Agent Builder उघडईपर्यंत वाट पहा**
4. **तुमचा weather MCP सर्व्हर नैसर्गिक भाषा क्वेरींनी टेस्ट करा**

या प्रकारे इनपुट करा

SYSTEM_PROMPT

```
You are my weather assistant
```

USER_PROMPT

```
How's the weather like in Seattle
```

![Agent Builder Debug Result](../../../../translated_images/mr/Result.6ac570f7d2b1d538.webp)

### टप्पा 8: MCP Inspector सह डीबग करा

1. **"Debug in Inspector" कॉन्फिगरेशन वापरा (Edge किंवा Chrome)**
2. **Inspector इंटरफेस उघडा: `http://localhost:6274`**
3. **परस्परसंवादी चाचणी वातावरण एक्सप्लोर करा:**
   - उपलब्ध टूल पाहा
   - टूल एक्झिक्युसन टेस्ट करा
   - नेटवर्क विनंत्या मॉनिटर करा
   - सर्व्हर प्रतिसाद डीबग करा

![MCP Inspector Interface](../../../../translated_images/mr/Inspector.5672415cd02fe873.webp)

---

## 🎯 मुख्य शिक्षण परिणाम

या लॅब पूर्ण करून, तुम्ही:

- [x] **Microsoft Foundry Toolkit टेम्प्लेट वापरून कस्टम MCP सर्व्हर तयार केले आहे**
- [x] **नवीनतम MCP SDK (v1.9.3) मध्ये अपग्रेड केले आहे ज्याने कार्यक्षमता वाढली आहे**
- [x] **Agent Builder आणि Inspector साठी व्यावसायिक डीबगिंग कार्यप्रवाह कॉन्फिगर केले आहेत**
- [x] **इंटरएक्टिव्ह सर्व्हर चाचणीसाठी MCP Inspector सेटअप केला आहे**
- [x] **MCP विकासासाठी VS Code डीबगिंग कॉन्फिगरेशनमध्ये पारंगत झाले आहात**

## 🔧 प्रगत वैशिष्ट्ये अन्वेषित

| वैशिष्ट्य | वर्णन | वापर प्रकरण |
|---------|-------------|----------|
| **MCP Python SDK v1.9.3** | नवीनतम प्रोटोकॉल अंमलबजावणी | आधुनिक सर्व्हर विकास |
| **MCP Inspector 0.14.0** | परस्परसंवादी डीबगिंग साधन | रिअल-टाइम सर्व्हर चाचणी |
| **VS Code डीबगिंग** | एकत्रित विकास वातावरण | व्यावसायिक डीबगिंग कार्यप्रवाह |
| **Agent Builder एकत्रीकरण** | थेट Microsoft Foundry Toolkit कनेक्शन | एजंटची अखंड चाचणी |

## 📚 अतिरिक्त संसाधने

- [MCP Python SDK Documentation](https://modelcontextprotocol.io/docs/sdk/python)
- [Microsoft Foundry Toolkit Extension Guide](https://code.visualstudio.com/docs/ai/ai-toolkit)
- [VS Code Debugging Documentation](https://code.visualstudio.com/docs/editor/debugging)
- [Model Context Protocol Specification](https://modelcontextprotocol.io/docs/concepts/architecture)

---

**🎉 अभिनंदन!** तुम्ही यशस्वीपणे लॅब 3 पूर्ण केली आहे आणि आता व्यावसायिक विकास कार्यप्रवाह वापरून कस्टम MCP सर्व्हर तयार, डीबग आणि तैनात करू शकता.

### 🔜 पुढील मॉड्यूलकडे पुढे जा

तुमच्या MCP कौशल्यांचा प्रत्यक्ष विकास कार्यप्रवाहात वापर करण्यासाठी तयार आहात? पुढे जा **[मॉड्यूल 4: Practical MCP Development - Custom GitHub Clone Server](../lab4/README.md)** जेथे तुम्ही करतील:
- GitHub रिपॉझिटरी ऑपरेशन्स स्वयंचलित करणारा उत्पादन तयार MCP सर्व्हर बांधणे
- MCP द्वारे GitHub रिपॉझिटरी क्लोनिंग कार्यक्षमता अंमलबजावणे
- VS Code आणि GitHub Copilot Agent Mode सह कस्टम MCP सर्व्हर एकत्रित करणे
- उत्पादन वातावरणात कस्टम MCP सर्व्हर टेस्ट आणि तैनात करणे
- विकासकांसाठी व्यावहारिक कार्यप्रवाह स्वयंचलन शिकणे

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
हा दस्तऐवज AI भाषांतर सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) चा वापर करून अनुवादित केला आहे. जरी आम्ही अचूकतेसाठी प्रयत्न करतो, तरी कृपया लक्षात घ्या की स्वयंचलित भाषांतरांमध्ये त्रुटी किंवा अचूकतेची कमतरता असू शकते. मूळ दस्तऐवज त्याच्या मूळ भाषेत अधिकृत स्रोत मानला पाहिजे. महत्त्वाची माहिती असल्यास, व्यावसायिक मानवी भाषांतराची शिफारस केली जाते. या भाषांतराच्या वापरामुळे उद्भवणाऱ्या कोणत्याही गैरसमज किंवा चुकीच्या अर्थलावणीसाठी आम्ही जबाबदार नाही.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->