# 🔧 मॉड्यूल 3: Microsoft Foundry Toolkit के साथ उन्नत MCP विकास

![Duration](https://img.shields.io/badge/Duration-20_minutes-blue?style=flat-square)
![Microsoft Foundry Toolkit](https://img.shields.io/badge/Microsoft_Foundry_Toolkit-Required-orange?style=flat-square)
![Python](https://img.shields.io/badge/Python-3.10+-green?style=flat-square)
![MCP SDK](https://img.shields.io/badge/MCP_SDK-1.9.3-purple?style=flat-square)
![Inspector](https://img.shields.io/badge/MCP_Inspector-0.14.0-blue?style=flat-square)

## 🎯 सीखने के उद्देश्य

इस लैब के अंत तक, आप सक्षम होंगे:

- ✅ Microsoft Foundry Toolkit का उपयोग करके कस्टम MCP सर्वर बनाना
- ✅ नवीनतम MCP Python SDK (v1.9.3) को कॉन्फ़िगर करना और उपयोग करना
- ✅ डिबगिंग के लिए MCP Inspector सेट अप और उपयोग करना
- ✅ Agent Builder और Inspector दोनों पर्यावरणों में MCP सर्वरों का डिबग करना
- ✅ उन्नत MCP सर्वर विकास प्रक्रियाओं को समझना

## 📋 पूर्वापेक्षाएँ

- लैब 2 (MCP Fundamentals) पूर्ण होना
- Microsoft Foundry Toolkit एक्सटेंशन के साथ VS Code स्थापित
- Python 3.10+ वातावरण
- Inspector सेटअप के लिए Node.js और npm

## 🏗️ आप क्या बनाएंगे

इस लैब में, आप एक **Weather MCP Server** बनाएंगे जो निम्नलिखित प्रदर्शित करता है:
- कस्टम MCP सर्वर कार्यान्वयन
- Microsoft Foundry Toolkit Agent Builder के साथ एकीकरण
- पेशेवर डिबगिंग वर्कफ्लोज़
- आधुनिक MCP SDK उपयोग पैटर्न

---

## 🔧 मुख्य घटकों का अवलोकन

### 🐍 MCP Python SDK
Model Context Protocol Python SDK कस्टम MCP सर्वर बनाने की नींव प्रदान करता है। आप संस्करण 1.9.3 का उपयोग करेंगे जिसमें बेहतर डिबगिंग क्षमताएँ हैं।

### 🔍 MCP Inspector
एक शक्तिशाली डिबगिंग उपकरण जो प्रदान करता है:
- रियल-टाइम सर्वर मॉनिटरिंग
- टूल निष्पादन विज़ुअलाइज़ेशन
- नेटवर्क अनुरोध/प्रतिक्रिया निरीक्षण
- इंटरैक्टिव परीक्षण वातावरण

---

## 📖 चरण-दर-चरण कार्यान्वयन

### चरण 1: Agent Builder में एक WeatherAgent बनाएं

1. **VS Code में Microsoft Foundry Toolkit एक्सटेंशन के माध्यम से Agent Builder लॉन्च करें**
2. **निम्नलिखित कॉन्फ़िगरेशन के साथ एक नया एजेंट बनाएँ:**
   - एजेंट नाम: `WeatherAgent`

![Agent Creation](../../../../translated_images/hi/Agent.c9c33f6a412b4cde.webp)

### चरण 2: MCP सर्वर परियोजना प्रारंभ करें

1. **Agent Builder में Tools** → **Add Tool** पर जाएं
2. **उपलब्ध विकल्पों में से "MCP Server" चुनें**
3. **"Create A new MCP Server" चुनें**
4. **`python-weather` टेम्पलेट चुनें**
5. **अपने सर्वर का नाम दें:** `weather_mcp`

![Python Template Selection](../../../../translated_images/hi/Pythontemplate.9d0a2913c6491500.webp)

### चरण 3: परियोजना खोलें और जांचें

1. **जेनरेट की गई परियोजना को VS Code में खोलें**
2. **परियोजना संरचना की समीक्षा करें:**
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

### चरण 4: नवीनतम MCP SDK पर अपग्रेड करें

> **🔍 क्यों अपग्रेड करें?** हम नवीनतम MCP SDK (v1.9.3) और Inspector सेवा (0.14.0) का उपयोग करना चाहते हैं ताकि बेहतर विशेषताएं और बेहतर डिबगिंग क्षमताएं मिल सकें।

#### 4a. Python Dependencies अपडेट करें

**`pyproject.toml` संपादित करें:** अपडेट करें [./code/weather_mcp/pyproject.toml](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/pyproject.toml)

#### 4b. Inspector कॉन्फ़िगरेशन अपडेट करें

**`inspector/package.json` संपादित करें:** अपडेट करें [./code/weather_mcp/inspector/package.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package.json)

#### 4c. Inspector Dependencies अपडेट करें

**`inspector/package-lock.json` संपादित करें:** अपडेट करें [./code/weather_mcp/inspector/package-lock.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package-lock.json)

> **📝 नोट:** यह फ़ाइल व्यापक निर्भरता परिभाषाएँ रखती है। नीचे आवश्यक संरचना है - पूर्ण सामग्री उचित निर्भरता समाधान सुनिश्चित करती है।

> **⚡ पूर्ण पैकेज लॉक:** पूरा package-lock.json लगभग 3000 लाइनों की निर्भरता परिभाषाएँ रखता है। ऊपर प्रमुख संरचना दिखाई गई है - पूर्ण निर्भरता समाधान के लिए प्रदान की गई फ़ाइल का उपयोग करें।

### चरण 5: VS Code डिबगिंग कॉन्फ़िगरेशन सेट करें

*नोट: कृपया निर्दिष्ट पथ पर फ़ाइल को कॉपी करें ताकि स्थानीय फ़ाइल प्रतिस्थापित हो सके*

#### 5a. लॉन्च कॉन्फ़िगरेशन अपडेट करें

**`.vscode/launch.json` संपादित करें:**

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

**`.vscode/tasks.json` संपादित करें:**

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

## 🚀 अपने MCP सर्वर को चलाना और परीक्षण करना

### चरण 6: निर्भरताएँ स्थापित करें

संरचना परिवर्तन करने के बाद, निम्नलिखित कमांड चलाएँ:

**Python निर्भरताएँ स्थापित करें:**
```bash
uv sync
```

**Inspector निर्भरताएँ स्थापित करें:**
```bash
cd inspector
npm install
```

### चरण 7: Agent Builder के साथ डिबग करें

1. **F5 दबाएँ** या **"Debug in Agent Builder"** कॉन्फ़िगरेशन का उपयोग करें
2. **डिबग पैनल से यौगिक (compound) कॉन्फ़िगरेशन चुनें**
3. **सर्वर शुरू होने और Agent Builder खुलने का इंतजार करें**
4. **प्राकृतिक भाषा प्रश्नों के साथ अपने Weather MCP सर्वर का परीक्षण करें**

इस प्रकार के इनपुट प्रॉम्प्ट करें

SYSTEM_PROMPT

```
You are my weather assistant
```

USER_PROMPT

```
How's the weather like in Seattle
```

![Agent Builder Debug Result](../../../../translated_images/hi/Result.6ac570f7d2b1d538.webp)

### चरण 8: MCP Inspector के साथ डिबग करें

1. **"Debug in Inspector"** कॉन्फ़िगरेशन का उपयोग करें (Edge या Chrome)
2. **Inspector इंटरफ़ेस खोलें** `http://localhost:6274` पर
3. **इंटरैक्टिव परीक्षण वातावरण का अन्वेषण करें:**
   - उपलब्ध टूल्स देखें
   - टूल निष्पादन का परीक्षण करें
   - नेटवर्क अनुरोधों की निगरानी करें
   - सर्वर प्रतिक्रियाओं का डिबग करें

![MCP Inspector Interface](../../../../translated_images/hi/Inspector.5672415cd02fe873.webp)

---

## 🎯 प्रमुख सीखने के परिणाम

इस लैब को पूरा करके, आपने:

- [x] **Microsoft Foundry Toolkit टेम्प्लेट का उपयोग करके एक कस्टम MCP सर्वर बनाया**
- [x] **बेहतर कार्यक्षमता के लिए नवीनतम MCP SDK (v1.9.3) में अपग्रेड किया**
- [x] **Agent Builder और Inspector दोनों के लिए पेशेवर डिबगिंग वर्कफ्लोज़ कॉन्फ़िगर किए**
- [x] **इंटरैक्टिव सर्वर परीक्षण के लिए MCP Inspector सेट अप किया**
- [x] **MCP विकास के लिए VS Code डिबगिंग कॉन्फ़िगरेशन मास्टर किया**

## 🔧 अन्वेषित उन्नत विशेषताएं

| विशेषता | विवरण | उपयोग मामला |
|---------|-------------|----------|
| **MCP Python SDK v1.9.3** | नवीनतम प्रोटोकॉल कार्यान्वयन | आधुनिक सर्वर विकास |
| **MCP Inspector 0.14.0** | इंटरैक्टिव डिबगिंग उपकरण | रियल-टाइम सर्वर परीक्षण |
| **VS Code डिबगिंग** | एकीकृत विकास पर्यावरण | पेशेवर डिबगिंग वर्कफ़्लो |
| **Agent Builder एकीकरण** | Microsoft Foundry Toolkit के साथ सीधे कनेक्शन | अंत-से-अंत एजेंट परीक्षण |

## 📚 अतिरिक्त संसाधन

- [MCP Python SDK प्रलेखन](https://modelcontextprotocol.io/docs/sdk/python)
- [Microsoft Foundry Toolkit एक्सटेंशन गाइड](https://code.visualstudio.com/docs/ai/ai-toolkit)
- [VS Code डिबगिंग प्रलेखन](https://code.visualstudio.com/docs/editor/debugging)
- [Model Context Protocol विनिर्देश](https://modelcontextprotocol.io/docs/concepts/architecture)

---

**🎉 बधाई हो!** आपने सफलतापूर्वक लैब 3 पूरा कर लिया है और अब आप पेशेवर विकास वर्कफ़्लो का उपयोग करके कस्टम MCP सर्वर बना, डिबग और तैनात कर सकते हैं।

### 🔜 अगले मॉड्यूल पर जाएं

अपने MCP कौशल को वास्तविक विकास वर्कफ़्लो में लागू करने के लिए तैयार हैं? **[मॉड्यूल 4: व्यावहारिक MCP विकास - कस्टम GitHub क्लोन सर्वर](../lab4/README.md)** पर जाएँ जहाँ आप:
- उत्पादन-तैयार MCP सर्वर बनाएंगे जो GitHub रिपॉजिटरी कार्यों को स्वचालित करता है
- MCP के माध्यम से GitHub रिपॉजिटरी क्लोनिंग कार्यक्षमता लागू करेंगे
- VS Code और GitHub Copilot Agent Mode के साथ कस्टम MCP सर्वरों को एकीकृत करेंगे
- उत्पादन पर्यावरण में कस्टम MCP सर्वरों का परीक्षण और तैनाती करेंगे
- डेवलपर्स के लिए व्यावहारिक वर्कफ़्लो स्वचालन सीखेंगे

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
इस दस्तावेज़ का अनुवाद AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) का उपयोग करके किया गया है। जबकि हम सटीकता के लिए प्रयास करते हैं, कृपया ध्यान दें कि स्वचालित अनुवादों में त्रुटियाँ या अशुद्धियाँ हो सकती हैं। मूल दस्तावेज़ अपनी मूल भाषा में ही प्रामाणिक स्रोत माना जाना चाहिए। महत्वपूर्ण जानकारी के लिए, पेशेवर मानव अनुवाद की सिफारिश की जाती है। इस अनुवाद के उपयोग से उत्पन्न किसी भी गलतफहमी या गलत व्याख्या के लिए हम उत्तरदायी नहीं हैं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->