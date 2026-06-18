# 🔧 Moduli 3: Maendeleo ya Juu ya MCP kwa Microsoft Foundry Toolkit

![Muda](https://img.shields.io/badge/Duration-20_minutes-blue?style=flat-square)
![Microsoft Foundry Toolkit](https://img.shields.io/badge/Microsoft_Foundry_Toolkit-Required-orange?style=flat-square)
![Python](https://img.shields.io/badge/Python-3.10+-green?style=flat-square)
![MCP SDK](https://img.shields.io/badge/MCP_SDK-1.9.3-purple?style=flat-square)
![Inspector](https://img.shields.io/badge/MCP_Inspector-0.14.0-blue?style=flat-square)

## 🎯 Malengo ya Kujifunza

Mwisho wa maabara hii, utaweza:

- ✅ Kuunda seva maalum za MCP kwa kutumia Microsoft Foundry Toolkit
- ✅ Kusanidi na kutumia MCP Python SDK ya kisasa (toleo 1.9.3)
- ✅ Kuweka na kutumia MCP Inspector kwa ajili ya utambuzi wa hitilafu
- ✅ Kutambua hitilafu za seva za MCP katika mazingira ya Agent Builder na Inspector
- ✅ Kuelewa michakato ya maendeleo ya juu ya seva ya MCP

## 📋 Masharti ya Awali

- Kumaliza Maabara 2 (Msingi wa MCP)
- VS Code yenye ugani wa Microsoft Foundry Toolkit umewekwa
- Mazingira ya Python 3.10+
- Node.js na npm kwa ajili ya usanidi wa Inspector

## 🏗️ Kile Utaambatana Nacho

Katika maabara hii, utaunda **Seva ya MCP ya Hali ya Hewa** inayonyesha:
- Utekelezaji maalum wa seva ya MCP
- Uunganisho na Agent Builder wa Microsoft Foundry Toolkit
- Michakato ya kitaalamu ya utambuzi wa hitilafu
- Mbinu za kisasa za matumizi ya MCP SDK

---

## 🔧 Muhtasari wa Vipengele Muhimu

### 🐍 MCP Python SDK
Model Context Protocol Python SDK hutoa msingi wa kujenga seva maalum za MCP. Utatumia toleo 1.9.3 lenye uwezo ulioimarishwa wa utambuzi wa hitilafu.

### 🔍 MCP Inspector
Chombo kikubwa cha utambuzi wa hitilafu kinachotoa:
- Ufuatiliaji wa seva kwa wakati halisi
- Uonyesho wa utekelezaji wa zana
- Ukaguzi wa maombi/jibu ya mtandao
- Mazingira ya majaribio ya ushirikiano

---

## 📖 Utekelezaji Hatua kwa Hatua

### Hatua 1: Unda WeatherAgent katika Agent Builder

1. **anzisha Agent Builder** katika VS Code kupitia ugani wa Microsoft Foundry Toolkit
2. **unda wakala mpya** kwa usanidi ufuatao:
   - Jina la wakala: `WeatherAgent`

![Kuunda Wakala](../../../../translated_images/sw/Agent.c9c33f6a412b4cde.webp)

### Hatua 2: Anzisha Mradi wa Seva ya MCP

1. **Nenda Tools** → **Add Tool** katika Agent Builder
2. **Chagua "MCP Server"** kutoka kwa chaguzi zinazopatikana
3. **Chagua "Create A new MCP Server"**
4. **Chagua kiolezo cha `python-weather`**
5. **Jina seva yako:** `weather_mcp`

![Kuchagua Kiolezo cha Python](../../../../translated_images/sw/Pythontemplate.9d0a2913c6491500.webp)

### Hatua 3: Fungua na Kagua Mradi

1. **Fungua mradi uliotengenezwa** katika VS Code
2. **Pitia muundo wa mradi:**
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

### Hatua 4: Sasisha kwa MCP SDK ya Hivi Karibuni

> **🔍 Kwa Nini Kusasisha?** Tunataka kutumia MCP SDK ya hivi karibuni (toleo 1.9.3) na huduma ya Inspector (0.14.0) kwa vipengele vilivyoimarishwa na uwezo bora wa utambuzi wa hitilafu.

#### 4a. Sasisha Vitegemezi vya Python

**Hariri `pyproject.toml`:** sasisha [./code/weather_mcp/pyproject.toml](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/pyproject.toml)


#### 4b. Sasisha Mpangilio wa Inspector

**Hariri `inspector/package.json`:** sasisha [./code/weather_mcp/inspector/package.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package.json)

#### 4c. Sasisha Vitegemezi vya Inspector

**Hariri `inspector/package-lock.json`:** sasisha [./code/weather_mcp/inspector/package-lock.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package-lock.json)

> **📝 Kumbuka:** Hili faili lina maelezo ya kina ya utegemezi. Hapa chini ni muundo muhimu - yaliyomo kamili huhakikisha utatuzi sahihi wa utegemezi.


> **⚡ Kifungo Kamili cha Pakiti:** Faili kamili ya package-lock.json ina mistari ~3000 ya maelezo ya utegemezi. Hapo juu inaonyesha muundo mkuu - tumia faili iliyotolewa kwa utatuzi kamili.

### Hatua 5: Sanidi Utambuzi wa VS Code

*Kumbuka: Tafadhali nakili faili katika njia iliyoainishwa ili kubadilisha faili zinazolingana za eneo lako*

#### 5a. Sasisha Mpangilio wa Kuzindua

**Hariri `.vscode/launch.json`:**

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

**Hariri `.vscode/tasks.json`:**

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

## 🚀 Kuendesha na Kupima Seva Yako ya MCP

### Hatua 6: Sakinisha Vitegemezi

Baada ya kufanya mabadiliko ya usanidi, tumia amri zifuatazo:

**Sakinisha utegemezi wa Python:**
```bash
uv sync
```

**Sakinisha utegemezi wa Inspector:**
```bash
cd inspector
npm install
```

### Hatua 7: Kutambuzi na Agent Builder

1. **Bonyeza F5** au tumia usanidi wa **"Debug in Agent Builder"**
2. **Chagua usanidi changamano** kutoka kwenye paneli ya utambuzi
3. **Subiri seva kuanza** na Agent Builder kufunguliwa
4. **Jaribu seva yako ya hali ya hewa ya MCP** kwa maswali ya lugha ya asili

Weka mfumo kama huu

SYSTEM_PROMPT

```
You are my weather assistant
```

USER_PROMPT

```
How's the weather like in Seattle
```

![Matokeo ya Utambuzi wa Agent Builder](../../../../translated_images/sw/Result.6ac570f7d2b1d538.webp)

### Hatua 8: Kutambuzi na MCP Inspector

1. **Tumia usanidi wa "Debug in Inspector"** (Edge au Chrome)
2. **Fungua kiolesura cha Inspector** kwa `http://localhost:6274`
3. **Chunguza mazingira ya majaribio ya ushirikiano:**
   - Angalia zana zinazopatikana
   - Jaribu utekelezaji wa zana
   - Fuata maombi ya mtandao
   - Tambua hitilafu za majibu ya seva

![Kiolesura cha MCP Inspector](../../../../translated_images/sw/Inspector.5672415cd02fe873.webp)

---

## 🎯 Matokeo Muhimu ya Kujifunza

Kwa kumaliza maabara hii, umefanya:

- [x] **Kuunda seva maalum ya MCP** kwa kutumia violezo vya Microsoft Foundry Toolkit
- [x] **Kusasaisha hadi MCP SDK ya hivi karibuni** (toleo 1.9.3) kwa utendaji ulioimarishwa
- [x] **Kusanya michakato ya kitaalamu ya utambuzi wa hitilafu** kwa Agent Builder na Inspector
- [x] **Kuweka MCP Inspector** kwa jaribio la huduma ya seva
- [x] **Kuwa mtaalamu wa usanidi wa utambuzi wa VS Code** kwa maendeleo ya MCP

## 🔧 Vipengele vya Juu Vilivyoshughulikiwa

| Kipengele | Maelezo | Matumizi |
|---------|-------------|----------|
| **MCP Python SDK v1.9.3** | Utekelezaji wa itifaki ya hivi karibuni | Maendeleo ya seva ya kisasa |
| **MCP Inspector 0.14.0** | Chombo cha utambuzi wa ushirikiano | Majaribio ya seva kwa wakati halisi |
| **Utambuzi wa VS Code** | Mazingira ya maendeleo yaliyoshirikishwa | Kazi za utambuzi wa kitaalamu |
| **Uunganisho wa Agent Builder** | Muunganisho wa moja kwa moja wa Microsoft Foundry Toolkit | Majaribio ya wakala toka mwanzo hadi mwisho |

## 📚 Rasilimali Zingine

- [Nyaraka za MCP Python SDK](https://modelcontextprotocol.io/docs/sdk/python)
- [Mwongozo wa Ugani wa Microsoft Foundry Toolkit](https://code.visualstudio.com/docs/ai/ai-toolkit)
- [Nyaraka za Utambuzi wa VS Code](https://code.visualstudio.com/docs/editor/debugging)
- [Ufafanuzi wa Model Context Protocol](https://modelcontextprotocol.io/docs/concepts/architecture)

---

**🎉 Hongera!** Umefanikiwa kumaliza Maabara 3 na sasa unaweza kuunda, kutambua, na kupeleka seva maalum za MCP kwa kutumia michakato ya maendeleo ya kitaalamu.

### 🔜 Endelea kwa Moduli Ifuatayo

Uko tayari kutumia ujuzi wako wa MCP katika mtiririko halisi wa maendeleo? Endelea kwa **[Moduli 4: Maendeleo ya Kivitendo ya MCP - Seva Maalum ya Kubadili GitHub](../lab4/README.md)** ambapo ut:
- Kujenga seva ya MCP tayari kwa uzalishaji inayofanikisha otomatiki shughuli za hifadhidata ya GitHub
- Kutekeleza utendaji wa kunakili hifadhidata ya GitHub kupitia MCP
- Kuunganishwa kwa seva maalum za MCP na VS Code na GitHub Copilot Agent Mode
- Kupima na kupeleka seva maalum za MCP katika mazingira ya uzalishaji
- Kujifunza ut automatisering wa mtiririko wa kazi wa vitendo kwa watengenezaji programu

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Kionyozo**:
Hati hii imetafsiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kupata usahihi, tafadhali fahamu kwamba tafsiri za kiotomatiki zinaweza kuwa na makosa au upungufu wa usahihi. Hati ya asili katika lugha yake halisi inapaswa kuchukuliwa kama chanzo cha mamlaka. Kwa taarifa muhimu, tafsiri ya kitaalamu inayofanywa na binadamu inapendekezwa. Hatutojibu kwa kuelewa vibaya au tafsiri potofu zinazotokea kutokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->