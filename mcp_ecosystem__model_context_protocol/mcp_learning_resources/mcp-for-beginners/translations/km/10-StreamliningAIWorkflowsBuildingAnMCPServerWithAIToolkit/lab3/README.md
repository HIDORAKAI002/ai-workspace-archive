# 🔧 ម៉ូឌុល 3៖ ការអភិវឌ្ឍ MCP ជំហានខ្ពស់ជាមួយ Microsoft Foundry Toolkit

![Duration](https://img.shields.io/badge/Duration-20_minutes-blue?style=flat-square)
![Microsoft Foundry Toolkit](https://img.shields.io/badge/Microsoft_Foundry_Toolkit-Required-orange?style=flat-square)
![Python](https://img.shields.io/badge/Python-3.10+-green?style=flat-square)
![MCP SDK](https://img.shields.io/badge/MCP_SDK-1.9.3-purple?style=flat-square)
![Inspector](https://img.shields.io/badge/MCP_Inspector-0.14.0-blue?style=flat-square)

## 🎯 គោលបំណងរៀន

នៅចុងបញ្ចប់នៃមន្ទីរ this lab, អ្នកនឹងអាច:

- ✅ បង្កើតម៉ាស៊ីនបម្រើ MCP លក្ខណៈផ្ទាល់ខ្លួនដោយប្រើ Microsoft Foundry Toolkit
- ✅ កំណត់រចនាសម្ព័ន្ធ និងប្រើ MCP Python SDK ជំនាន់ចុងក្រោយ (v1.9.3)
- ✅ កំណត់ និងប្រើ MCP Inspector សម្រាប់កំហុសត្រួតពិនិត្យ
- ✅ បញ្ច្រាស់កំហុសម៉ាស៊ីនបម្រើ MCP ក្នុងបរិយាកាស Agent Builder និង Inspector
- ✅ យល់ដឹងពីលំដាប់ការអភិវឌ្ឍម៉ាស៊ីនបម្រើ MCP ជំហានខ្ពស់

## 📋 លក្ខខ័ណ្ឌមុនដំណើរការ

- បញ្ចប់ Lab 2 (គ្រឹះមូល MCP)
- VS Code ជាមួយការបន្ថែម Microsoft Foundry Toolkit ត្រូវបានដំឡើង
- បរិយាកាស Python 3.10+
- Node.js និង npm សម្រាប់ការកំណត់ Inspector

## 🏗️ អ្វីដែលអ្នកនឹងបង្កើត

ក្នុងមន្ទីរនេះ អ្នកនឹងបង្កើត **ម៉ាស៊ីនបម្រើ Weather MCP** ដែលបង្ហាញពី៖
- ការអនុវត្តម៉ាស៊ីនបម្រើ MCP លក្ខណៈផ្ទាល់ខ្លួន
- ការតភ្ជាប់ជាមួយ Microsoft Foundry Toolkit Agent Builder
- លំដាប់ការកំហុសត្រួតពិនិត្យមានជំរុញវិជ្ជាជីវៈ
- លំនាំប្រើ MCP SDK សម័យថ្មី

---

## 🔧 ទិដ្ឋភាពទូទៅសមាសភាគស្នូល

### 🐍 MCP Python SDK
Model Context Protocol Python SDK ផ្តល់មូលដ្ឋានសម្រាប់បង្កើតម៉ាស៊ីនបម្រើ MCP ផ្ទាល់ខ្លួន។ អ្នកនឹងប្រើជំនាន់ 1.9.3 ជាមួយសមត្ថភាពកំហុសត្រួតពិនិត្យកាន់តែច្បាស់លាស់។

### 🔍 MCP Inspector
ឧបករណ៍កំហុសត្រួតពិនិត្យមានថាមពល ដែលផ្តល់៖
- ការត្រួតពិនិត្យម៉ាស៊ីនបម្រើពេលវេលាពិត
- ការមើលឃើញការប្រតិបត្តិឧបករណ៍
- ការត្រួតពិនិត្យការស្នើសុំនិងចម្លើយបណ្ដាញ
- បរិយាកាសសាកល្បងអន្តរកម្ម

---

## 📖 អនុវត្តជំហាន-ប្រចាំជំហាន

### ជំហាន 1៖ បង្កើត WeatherAgent ក្នុង Agent Builder

1. **បើក Agent Builder** 在 VS Code តាមរយៈការបន្ថែម Microsoft Foundry Toolkit
2. **បង្កើត agent ថ្មី** ជាមួយរចនាសម្ព័ន្ធដូចខាងក្រោម៖
   - ឈ្មោះ Agent: `WeatherAgent`

![Agent Creation](../../../../translated_images/km/Agent.c9c33f6a412b4cde.webp)

### ជំហាន 2៖ ចាប់ផ្តើមគម្រោងម៉ាស៊ីនបម្រើ MCP

1. **ទៅកាន់ Tools** → **Add Tool** ក្នុង Agent Builder
2. **ជ្រើស "MCP Server"** ពីជម្រើសមានស្រាប់
3. **ជ្រើស "Create A new MCP Server"**
4. **ជ្រើសនិមិត្តសញ្ញា `python-weather`**
5. **ដាក់ឈ្មោះម៉ាស៊ីនបម្រើរបស់អ្នក:** `weather_mcp`

![Python Template Selection](../../../../translated_images/km/Pythontemplate.9d0a2913c6491500.webp)

### ជំហាន 3៖ បើក និងពិនិត្យគម្រោង

1. **បើកគម្រោងបានបង្កើត** នៅក្នុង VS Code
2. **ពិនិត្យរចនាសម្ព័ន្ធគម្រោង៖**
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

### ជំហាន 4៖ បង្គណ៍ទៅ MCP SDK ជំនាន់ចុងក្រោយ

> **🔍 មាថាលើកមកថ្មី?** ពួកយើងចង់ប្រើ MCP SDK ជំនាន់ចុងក្រោយ (v1.9.3) និងសេវាកម្ម Inspector (0.14.0) សម្រាប់មុខងារដែលមានការកែលម្អ និងជំនួយកំហុសឆ្ពោះមុខ។

#### 4a. បន្ទាន់សម័យផ្នែក Python Dependencies

**កែសម្រួល `pyproject.toml`:** បន្ទាន់សម័យ [./code/weather_mcp/pyproject.toml](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/pyproject.toml)


#### 4b. បន្ទាន់សម័យរចនាសម្ព័ន្ធ Inspector

**កែសម្រួល `inspector/package.json`:** បន្ទាន់សម័យ [./code/weather_mcp/inspector/package.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package.json)

#### 4c. បន្ទាន់សម័យ Dependencies Inspector

**កែសម្រួល `inspector/package-lock.json`:** បន្ទាន់សម័យ [./code/weather_mcp/inspector/package-lock.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package-lock.json)

> **📝 សម្គាល់៖** ឯកសារនេះមានការកំណត់លក្ខខណ្ឌ dependency ធំទូលាយ។ ខាងក្រោមជារចនាសម្ព័ន្ធសំខាន់ - មាតិកាពេញលេញធានាការដោះស្រាយ dependency ត្រឹមត្រូវ។

> **⚡ ការកំណត់ពេញលេញ Package Lock:** package-lock.json ពេញលេញមានជាយូរលានៅ ~3000 បន្ទាត់នៃការកំណត់ dependency។ ខាងលើបង្ហាញរចនាសម្ព័ន្ធសំខាន់ -  ប្រើឯកសារបំបែកនេះសម្រាប់ការដោះស្រាយ dependency ទាំងមូល។

### ជំហាន 5៖ កំណត់រចនាសម្ព័ន្ធ VS Code របស់ការកំហុសត្រួតពិនិត្យ

*សម្គាល់៖ សូមចម្លងឯកសារនៅទីតាំងកំណត់ទៅលើឯកសារក្នុងម្ដងក្នុងម៉ាស៊ីនរបស់អ្នក*

#### 5a. បន្ទាន់សម័យរចនាសម្ព័ន្ធចាប់ផ្តើម

**កែសម្រួល `.vscode/launch.json`:**

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

**កែសម្រួល `.vscode/tasks.json`:**

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

## 🚀 រត់ និង សាកល្បងម៉ាស៊ីនបម្រើ MCP របស់អ្នក

### ជំហាន 6៖ ដំឡើង Dependencies

បន្ទាប់ពីធ្វើបម្រែបម្រួលរចនាសម្ព័ន្ធ ចាប់ផ្តើមបញ្ជាលេខខាងក្រោម៖

**ដំឡើង Python dependencies:**
```bash
uv sync
```

**ដំឡើង Inspector dependencies:**
```bash
cd inspector
npm install
```

### ជំហាន 7៖ កំហុសត្រួតពិនិត្យជាមួយ Agent Builder

1. **ចុច F5** ឬប្រើរចនាសម្ព័ន្ធ **"Debug in Agent Builder"**
2. **ជ្រើសរចនាសម្ព័ន្ធ compound** ពីផ្ទាំង debug
3. **រង់ចាំម៉ាស៊ីនបម្រើចាប់ផ្តើម** និង Agent Builder បើកឡើង
4. **សាកល្បងម៉ាស៊ីនបម្រើ weather MCP របស់អ្នក** ជាមួយសំណួរភាសាធម្មតា

បញ្ចូល prompt ដូចខាងក្រោម

SYSTEM_PROMPT

```
You are my weather assistant
```

USER_PROMPT

```
How's the weather like in Seattle
```

![Agent Builder Debug Result](../../../../translated_images/km/Result.6ac570f7d2b1d538.webp)

### ជំហាន 8៖ កំហុសត្រួតពិនិត្យជាមួយ MCP Inspector

1. **ប្រើរចនាសម្ព័ន្ធ "Debug in Inspector"** (Edge ឬ Chrome)
2. **បើកផ្ទាំង Inspector** នៅ `http://localhost:6274`
3. **ស្វែងយល់បរិយាកាសសាកល្បងអន្តរកម្ម៖**
   - មើលឧបករណ៍ដែលមានស្រាប់
   - សាកល្បងការប្រតិបត្តិឧបករណ៍
   - ត្រួតពិនិត្យសំណើបណ្ដាញ
   - កំហុសត្រួតពិនិត្យចម្លើយម៉ាស៊ីនបម្រើ

![MCP Inspector Interface](../../../../translated_images/km/Inspector.5672415cd02fe873.webp)

---

## 🎯 លទ្ធផលការរៀនសំខាន់ៗ

ដោយបញ្ចប់មន្ទីរនេះ អ្នកបាន:

- [x] **បង្កើតម៉ាស៊ីនបម្រើ MCP ផ្ទាល់ខ្លួន** ដោយប្រើគំរូ Microsoft Foundry Toolkit
- [x] **បន្ទាន់សម័យទៅ MCP SDK ជំនាន់ចុងក្រោយ** (v1.9.3) សម្រាប់មុខងារកែលម្អ
- [x] **កំណត់លំដាប់កំហុសត្រួតពិនិត្យជាងវិជ្ជាជីវៈ** សម្រាប់ Agent Builder និង Inspector
- [x] **ដំឡើង MCP Inspector** សម្រាប់សាកល្បងម៉ាស៊ីនបម្រើអន្តរកម្ម
- [x] **មានជំនាញក្នុងការកំណត់ VS Code សម្រាប់កំហុសត្រួតពិនិត្យ MCP**

## 🔧 មុខងារលម្អិតដែលបានស្វែងយល់

| មុខងារ | ការពិពណ៌នា | ករណីប្រើប្រាស់ |
|---------|-------------|----------|
| **MCP Python SDK v1.9.3** | ការអនុវត្តពិធីការថ្មី | ការអភិវឌ្ឍម៉ាស៊ីនបម្រើសម័យថ្មី |
| **MCP Inspector 0.14.0** | ឧបករណ៍កំហុសត្រួតពិនិត្យអន្តរកម្ម | សាកល្បងម៉ាស៊ីនបម្រើពេលវេលាពិត |
| **ការកំហុសត្រួតពិនិត្យ VS Code** | វិស្វកម្មអភិវឌ្ឍបិទជុំ | លំនាំកំហុសត្រួតពិនិត្យជាងវិជ្ជាជីវៈ |
| **ការចងក្រង Agent Builder** | ការតភ្ជាប់ផ្ទាល់ Microsoft Foundry Toolkit | សាកល្បង agent ពេញលេញ |

## 📚 ឯកសារបន្ថែម

- [ឯកសារ MCP Python SDK](https://modelcontextprotocol.io/docs/sdk/python)
- [មគ្គុទេសក៍ Microsoft Foundry Toolkit Extension](https://code.visualstudio.com/docs/ai/ai-toolkit)
- [ឯកសារកំហុសត្រួតពិនិត្យ VS Code](https://code.visualstudio.com/docs/editor/debugging)
- [បញ្ជាក់ Model Context Protocol](https://modelcontextprotocol.io/docs/concepts/architecture)

---

**🎉 សូមអបអរសាទរ!** អ្នកបានបញ្ចប់ Lab 3 ជោគជ័យ ហើយឥឡូវនេះអាចបង្កើត កំហុសត្រួតពិនិត្យ និងប្រើប្រាស់ម៉ាស៊ីនបម្រើ MCP ផ្ទាល់ខ្លួនដោយលំនាំអភិវឌ្ឍវិជ្ជាជីវៈ។

### 🔜 បន្តទៅម៉ូឌុលបន្ទាប់

រួចរាល់ដើម្បីដាក់បញ្ចូលជំនាញ MCP របស់អ្នកទៅលំនាំអភិវឌ្ឍជាក់ស្តែង? បន្តទៅ **[Module 4: Practical MCP Development - Custom GitHub Clone Server](../lab4/README.md)** ដែលអ្នកនឹង៖
- បង្កើតម៉ាស៊ីនបម្រើ MCP ទីបំផុតដែលស្វ័យប្រវត្តិកម្មប្រតិបត្តិការក្នុង GitHub repository
- អនុវត្តមុខងារចម្លង GitHub repository តាម MCP
- បញ្ចូលម៉ាស៊ីនបម្រើ MCP ផ្ទាល់ខ្លួនជាមួយ VS Code និង GitHub Copilot Agent Mode
- សាកល្បង និងដាក់ម៉ាស៊ីនបម្រើ MCP ផ្ទាល់ខ្លួនក្នុងបរិយាកាសផលិតកម្ម
- រៀនលំនាំស្វ័យប្រវត្តិការអភិវឌ្ឍខាងជាក់ស្តែងសម្រាប់អ្នកអភិវឌ្ឍការ

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ការបដិសេធ**:
ឯកសារនេះត្រូវបានបម្លែងភាសា ដោយប្រើសេវាបម្លែងភាសា AI [Co-op Translator](https://github.com/Azure/co-op-translator)។ ទោះយើងខ្ញុំមានក្តីប្រាថ្នាឱ្យបានច្បាស់លាស់ តែសូមយល់ដឹងថាការបម្លែងដោយស្វ័យប្រវត្តិក៏អាចមានកំហុសឬភាពមិនត្រឹមត្រូវ។ ឯកសារដើមជាភាសាទីតាំងគួរត្រូវបានគេប្រើជាប្រភពច្បាស់លាស់។ សម្រាប់ព័ត៌មានសំខាន់ៗ សូមណែនាំឱ្យប្រើប្រាស់ការប្រែដោយមនុស្សជំនាញ។ យើងខ្ញុំមិនទទួលខុសត្រូវចំពោះការយល់ច្រឡំ ឬការបកស្រាយខុសបន្ទាប់ពីការប្រើប្រាស់ការបម្លែងនេះនោះទេ។
<!-- CO-OP TRANSLATOR DISCLAIMER END -->