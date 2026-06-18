# 🔧 Module 3: Microsoft Foundry Toolkit ဖြင့် အဆင့်မြင့် MCP ဖွံ့ဖြိုးမှု

![Duration](https://img.shields.io/badge/Duration-20_minutes-blue?style=flat-square)
![Microsoft Foundry Toolkit](https://img.shields.io/badge/Microsoft_Foundry_Toolkit-Required-orange?style=flat-square)
![Python](https://img.shields.io/badge/Python-3.10+-green?style=flat-square)
![MCP SDK](https://img.shields.io/badge/MCP_SDK-1.9.3-purple?style=flat-square)
![Inspector](https://img.shields.io/badge/MCP_Inspector-0.14.0-blue?style=flat-square)

## 🎯 သင်ယူရမည့် ရည်မှန်းချက်များ

ဤဓာတ်သိမ်းပြီးတော့ သင်အောက်ပါအရာများကို လုပ်ဆောင်နိုင်ပါလိမ့်မည်-

- ✅ Microsoft Foundry Toolkit ကို အသုံးပြု၍ စိတ်ကြိုက် MCP ဆာဗာများ ဖန်တီးနိုင်ခြင်း
- ✅ နောက်ဆုံး MCP Python SDK (v1.9.3) ကို ပြင်ဆင် အသုံးပြုနိုင်မှု
- ✅ MCP Inspector ကို စနစ်တကျ ဖွင့်၍ ပြတ်သားသေချာစွာ အသုံးပြုနိုင်ခြင်း
- ✅ Agent Builder နှင့် Inspector ပတ်ဝန်းကျင်များတွင် MCP ဆာဗာများကို ပြဿနာရှာဖွေပြင်ဆင်နိုင်ခြင်း
- ✅ အဆင့်မြင့် MCP ဆာဗာ ဖွံ့ဖြိုးမှုလုပ်ငန်းစဉ်များ နားလည်ခြင်း

## 📋 လိုအပ်ချက်များ

- Lab 2 (MCP အခြေခံစနစ်) ပြီးမြောက်ပြီးသား ဖြစ်ရမည်
- VS Code တွင် Microsoft Foundry Toolkit ထည့်သွင်းပြီး အသုံးပြုနိုင်ခြင်း
- Python 3.10+ ပတ်ဝန်းကျင်
- Inspector အသုံးပြုရန် Node.js နှင့် npm တပ်ဆင်ပြီးဖြစ်ရမည်

## 🏗️ သင်တည်ဆောက်မည့် အရာ

ဤလက်တွေ့လေ့ကျင့်မှုပြုလုပ်ကာ သင် တည်ဆောက်မည့် **ဟာသဝေ MCP ဆာဗာ** သည်-

- စိတ်ကြိုက် MCP ဆာဗာ အကောင်အထည်ဖော်ခြင်း
- Microsoft Foundry Toolkit Agent Builder နဲ့ ပေါင်းစပ် ဆက်သွယ်ခြင်း
- အလုပ်ကျွမ်းကျင်သည့် ပြဿနာရှာ‌ဖွေရန် လုပ်ငန်းစဉ်များ
- ခေတ်မီ MCP SDK အသုံးပြုပုံ များ

---

## 🔧 အဓိကအစိတ်အပိုင်းများ ကြည့်ရှုခြင်း

### 🐍 MCP Python SDK  
Model Context Protocol Python SDK သည် စိတ်ကြိုက် MCP ဆာဗာများ တည်ဆောက်ရာ အခြေခံဖြစ်သည်။ သင်သည် version 1.9.3 ကို ပြဿနာရှာဖွေမှုတိုးတက်မှုများနှင့် အသုံးပြုပါမည်။

### 🔍 MCP Inspector  
ပြဿနာရှာဖွေရေးအတွက် စူးစမ်းစစ်ဆေးမှုကိရိယာ အလိုအလျောက် ရရှိသည်-  
- အချိန်နဲ့တပြေးညီ ဆာဗာစောင့်ကြည့်ခြင်း  
- ကိရိယာ လည်ပတ်မှုမြင်ကွင်း  
- ကွန်ယက် တောင်းဆိုမှု/တုံ့ပြန်မှု စစ်ဆေးမှု  
- အပြန်အလှန် စမ်းသပ်နိုင်သော ပတ်ဝန်းကျင်  

---

## 📖 အဆင့်ချင်းဆင့် အကောင်အထည်ဖော်ခြင်း

### အဆင့် ၁: Agent Builder တွင် WeatherAgent ဖန်တီးခြင်း

1. VS Code တွင် Microsoft Foundry Toolkit extension မှတဆင့် **Agent Builder ကို ဖွင့်ပါ**  
2. အောက်ပါရည်ညွှန်းချက်ဖြင့် **အေးဂျင့်အသစ်တစ်ခု ဖန်တီးပါ**  
   - အေးဂျင့်အမည်: `WeatherAgent`  

![Agent Creation](../../../../translated_images/my/Agent.c9c33f6a412b4cde.webp)

### အဆင့် ၂: MCP ဆာဗာ ပရောဂျက် စတင်တည်ဆောက်ခြင်း

1. Agent Builder တွင် **Tools → Add Tool** သို့ သွားပါ  
2. ရွေးချယ်မှုအဖြစ် **“MCP Server”** ကိုရွေးပါ  
3. **“Create A new MCP Server”** ကို ရွေးချယ်ပါ  
4. `python-weather` နမူနာကို ရွေးချယ်ပါ  
5. ဆာဗာအမည်ကိုရေးပါ - `weather_mcp`  

![Python Template Selection](../../../../translated_images/my/Pythontemplate.9d0a2913c6491500.webp)

### အဆင့် ၃: ပရောဂျက်ကို ဖွင့်ပြီး စစ်ဆေးပါ

1. VS Code တွင် ဖန်တီးထားသော ပရောဂျက်ဖိုင်များကို ဖွင့်ပါ  
2. ပရောဂျက်အဆောက်အအုံကို သုံးသပ်ပါ။  
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
  
### အဆင့် ၄: နောက်ဆုံး MCP SDK သို့ အဆင့်မြှင့်တင်ခြင်း

> **🔍 အဆင့်မြှင့်တင်ရန် အကြောင်းရင်း**: နောက်ဆုံး MCP SDK (v1.9.3) နှင့် Inspector ဝန်ဆောင်မှု (0.14.0) ကို အသုံးပြု၍ လုပ်ဆောင်ချက်များ မြှင့်တင်ရန်ဖြစ်သည်။

#### 4a. Python Dependencies များကို ပြင်ဆင်ခြင်း

**`pyproject.toml` ကို ပြင်ပါ:** [./code/weather_mcp/pyproject.toml](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/pyproject.toml) မှ

#### 4b. Inspector ဖိုင်ပြင်ဆင်ခြင်း

**`inspector/package.json` ကို ပြင်ပါ:** [./code/weather_mcp/inspector/package.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package.json)

#### 4c. Inspector Dependencies ပြင်ဆင်ခြင်း

**`inspector/package-lock.json` ကို ပြင်ပါ:** [./code/weather_mcp/inspector/package-lock.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package-lock.json)

> **📝 မှတ်ချက်:** ဤဖိုင်တွင် ခိုင်မာသော dependency ဖော်ပြချက်များပါဝင်သည်။ အောက်တွင် လိုအပ်သော အချိုးအစားပုံစံကို ဖော်ပြထားပြီး စုံလင်သောဖိုင်ပေးထားပါသည်။

> **⚡ ပြည့်စုံသော Package Lock:** ပြည့်စုံသော package-lock.json တွင် dependency ဖော်ပြချက် ~3000 လိုင်းရှိသည်။ အထက်ဖော်ပြသည့်အတိုင်း လိုအပ်ချက်ကို အသေးစိတ်သိရန် ဖိုင်အား အသုံးပြုပါ။

### အဆင့် ၅: VS Code Debugging ပြင်ဆင်ခြင်း

*မှတ်ချက်: ဖိုင်များကို သတ်မှတ်နေရာတွင် ကူးယူ ထည့်သွင်းပေးပါ*

#### 5a. Launch Configuration ပြင်ဆင်ခြင်း

**`.vscode/launch.json` ကို ပြင်ပါ။**

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
  
**`.vscode/tasks.json` ကို ပြင်ဆင်ပါ။**

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

## 🚀 MCP ဆာဗာကို ပြေးဆွဲပြီး စမ်းသပ်ခြင်း

### အဆင့် ၆: Dependencies များ ထည့်သွင်းခြင်း

ပြင်ဆင်မှုများ ပြီးဆုံး၍ အောက်ပါ command များကို ပြုလုပ်ပါ-

**Python dependencies ထည့်သွင်းရန်:**  
```bash
uv sync
```
  
**Inspector dependencies ထည့်သွင်းရန်:**  
```bash
cd inspector
npm install
```


### အဆင့် ၇: Agent Builder ဖြင့် Debug ပြုလုပ်ခြင်း

1. **F5 ခလုတ်ကို နှိပ်ပါ** သို့မဟုတ် **"Debug in Agent Builder"** configuration ကို အသုံးပြုပါ  
2. Debug panel မှ compound configuration ကို ရွေးချယ်ပါ  
3. ဆာဗာ စတင်ပြီး Agent Builder ဖွင့်လှစ်မှသာ စောင့်ပါ  
4. သဘာဝဘာသာ စကားဖြင့် weather MCP ဆာဗာကို စမ်းသပ် ကြည့်ပါ

အောက်ပါပုံစံဖြင့် input ပေးပါ

SYSTEM_PROMPT

```
You are my weather assistant
```
  
USER_PROMPT

```
How's the weather like in Seattle
```
  
![Agent Builder Debug Result](../../../../translated_images/my/Result.6ac570f7d2b1d538.webp)

### အဆင့် ၈: MCP Inspector ဖြင့် Debug ပြုလုပ်ခြင်း

1. **"Debug in Inspector"** configuration ကို သုံးပါ (Edge သို့ Chrome)  
2. Inspector အင်တာဖေ့စ်ကို `http://localhost:6274` တွင် ဖွင့်ပါ  
3. အပြန်အလှန် စမ်းသပ်နိုင်သော ပတ်ဝန်းကျင်များကို ရှာဖွေလိုက်ပါ-  
   - ရရှိနိုင်သည့် ကိရိယာများ ကြည့်ရှုခြင်း  
   - ကိရိယာ လည်ပတ်မှု စမ်းသပ်ခြင်း  
   - ကွန်ယက် တောင်းဆိုမှုများ စောင့်ကြည့်ခြင်း  
   - ဆာဗာ တုံ့ပြန်မှုများ ပြဿနာရှာဖွေရေး  

![MCP Inspector Interface](../../../../translated_images/my/Inspector.5672415cd02fe873.webp)

---

## 🎯 အဓိကသင်ယူသည့်အချက်များ

ဤလက်တွေ့လေ့ကျင့်မှုပြီးဆုံးရာတွင် သင်မှာ-

- [x] Microsoft Foundry Toolkit နမူနာများကို အသုံးပြု၍ စိတ်ကြိုက် MCP ဆာဗာ ဖန်တီးတတ်ခြင်း  
- [x] လုပ်ဆောင်ချက်များ မြှင့်တင်ရန် နောက်ဆုံး MCP SDK (v1.9.3) သို့ အဆင့်မြှင့်တင်ထားခြင်း  
- [x] Agent Builder နှင့် Inspector နှစ်ခုလုံးအတွက် အလုပ်ကျွမ်းကျင်သည့် ပြဿနာရှာဖွေရေး လုပ်ငန်းစဉ်များ ပြင်ဆင်ထားခြင်း  
- [x] အပြန်အလှန် စမ်းသပ်နိုင်ရန် MCP Inspector သတ်မှတ်ထားခြင်း  
- [x] MCP ဖွံ့ဖြိုးမှုအတွက် VS Code debugging ဖြေရှင်းချက်များကျွမ်းကျင်စွာ အသုံးပြုနိုင်ခြင်း  

## 🔧 အဆင့်မြင့် လုပ်ဆောင်ချက်များ ရှာဖွေမှု

| လုပ်ဆောင်ချက် | ဖေါ်ပြချက် | အသုံးပြုမှု |
|---------|-------------|----------|
| **MCP Python SDK v1.9.3** | နောက်ဆုံး protocol အကောင်အထည်ဖော်မှု | ခေတ်မီဆာဗာဖွံ့ဖြိုးမှု |
| **MCP Inspector 0.14.0** | အပြန်အလှန် ပြဿနာရှာဖွေရေးကိရိယာ | အချိန်နဲ့တပြေးညီ ဆာဗာ စမ်းသပ်မှု |
| **VS Code Debugging** | ပေါင်းစပ်တာဝန်ခံဖွံ့ဖြိုးရေးပတ်ဝန်းကျင် | အလုပ်ကျွမ်းကျင် ပြဿနာရှာဖွေရေး |
| **Agent Builder ပေါင်းစပ်မှု** | Microsoft Foundry Toolkit နဲ့ တိုက်ရိုက်ချိတ်ဆက်မှု | အေးဂျင့် စမ်းသပ်မှု အဆုံးအဖြတ် |

## 📚 ထပ်ဆင့် အရင်းအမြစ်များ

- [MCP Python SDK Documentation](https://modelcontextprotocol.io/docs/sdk/python)  
- [Microsoft Foundry Toolkit Extension Guide](https://code.visualstudio.com/docs/ai/ai-toolkit)  
- [VS Code Debugging Documentation](https://code.visualstudio.com/docs/editor/debugging)  
- [Model Context Protocol Specification](https://modelcontextprotocol.io/docs/concepts/architecture)  

---

**🎉 ဂုဏ်ယူပါတယ်!** သင် Lab 3 ကို အောင်မြင်စွာပြီးမြောက်ပြီး စိတ်ကြိုက် MCP ဆာဗာများ ဖန်တီး၊ ပြဿနာရှာဖွေရေးနှင့် ထုတ်အုံးခြင်းတို့ကို အလုပ်ကျွမ်းကျင်စွာ လုပ်ဆောင်နိုင်ပြီဖြစ်သည်။

### 🔜 နောက် Module ကို ဆက်လုပ်ရန်

သင်၏ MCP ကျွမ်းကျင်မှုများကို လက်တွေ့လုပ်ငန်းစဉ်တွင် အသုံးပြုရန် ပြင်ဆင်လျှက်ရှိပါသလား? **[Module 4: Practical MCP Development - Custom GitHub Clone Server](../lab4/README.md)** သို့ ဆက်လက်သွားပါ။ အဲဒီမှာ သင်သည်-  
- ထုတ်လုပ်မှုအသင့် MCP ဆာဗာ တည်ဆောက်၍ GitHub repository လုပ်ငန်းစဉ်များကို အလိုအလျောက်စီမံနိုင်ပါမည်  
- MCP မှတစ်ဆင့် GitHub repository ကို ကလုန်းလုပ်ဆောင်ချက် ထည့်သွင်းနိုင်မည်  
- စိတ်ကြိုက် MCP ဆာဗာများကို VS Code နှင့် GitHub Copilot Agent Mode တို့နှင့် ပေါင်းစပ်အသုံးပြုနိုင်မည်  
- စိတ်ကြိုက် MCP ဆာဗာများကို ထုတ်လုပ်မှု ပတ်ဝန်းကျင်များတွင် စမ်းသပ်၊ ထုတ်လုပ်နိုင်မည်  
- ဖွံ့ဖြိုးသူများအတွက် လက်တွေ့ workflow automation ပညာရပ်များ သင်ယူနိုင်မည်

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ပြောကြားချက်**
ဤစာတမ်းကို AI ဘာသာပြန်ဝန်ဆောင်မှု [Co-op Translator](https://github.com/Azure/co-op-translator) အသုံးပြု၍ ဘာသာပြန်ထားပါသည်။ ကျွန်ုပ်တို့သည် တိကျမှန်ကန်မှုအတွက် ကြိုးပမ်းနေသော်လည်း၊ စက်ကိရိယာဘာသာပြန်ခြင်းများတွင် အမှားများ သို့မဟုတ် မှားယွင်းချက်များ ပါဝင်နိုင်ကြောင်း သတိပြုပါရန် လိုအပ်ပါသည်။ မူလစာတမ်းကို မူရင်းဘာသာဖြင့်သာ ယုံကြည်စိတ်ချရသော အချက်အလက်အဖြစ် သတ်မှတ်သင့်သည်။ အရေးကြီးသည့် သတင်းအချက်အလက်များအတွက် ပရော်ဖက်ရှင်နယ် လူသားဘာသာပြန်သူဝန်ဆောင်မှုကို အကြံပြုပါသည်။ ဤဘာသာပြန်ချက်ကို အသုံးပြုခြင်းမှ ဖြစ်ပေါ်လာသော နားလည်မှုကွာခြားမှုများ သို့မဟုတ် မမှန်ကန်သော အသုံးပြုမှုများအတွက် ကျွန်ုပ်တို့ တာဝန်မခံပါ။
<!-- CO-OP TRANSLATOR DISCLAIMER END -->