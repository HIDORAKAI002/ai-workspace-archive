# 🔧 Moduuli 3: Edistynyt MCP-kehitys Microsoft Foundry Toolkitilla

![Kesto](https://img.shields.io/badge/Duration-20_minutes-blue?style=flat-square)
![Microsoft Foundry Toolkit](https://img.shields.io/badge/Microsoft_Foundry_Toolkit-Required-orange?style=flat-square)
![Python](https://img.shields.io/badge/Python-3.10+-green?style=flat-square)
![MCP SDK](https://img.shields.io/badge/MCP_SDK-1.9.3-purple?style=flat-square)
![Inspector](https://img.shields.io/badge/MCP_Inspector-0.14.0-blue?style=flat-square)

## 🎯 Oppimistavoitteet

Tämän laboratorion lopussa osaat:

- ✅ Luoda mukautettuja MCP-palvelimia Microsoft Foundry Toolkitin avulla
- ✅ Määrittää ja käyttää uusinta MCP Python SDK:ta (v1.9.3)
- ✅ Asentaa ja käyttää MCP Inspector -työkalua virheenkorjaukseen
- ✅ Virheenkorjata MCP-palvelimia sekä Agent Builderissa että Inspectorissa
- ✅ Ymmärtää edistyneitä MCP-palvelinkehityksen työnkulkuja

## 📋 Esivaatimukset

- Lab 2 (MCP Fundamentals) suoritettuna
- VS Code, johon on asennettu Microsoft Foundry Toolkit -laajennus
- Python 3.10+ -ympäristö
- Node.js ja npm Inspectorin asentamista varten

## 🏗️ Mitä rakennat

Tässä laboratoriossa rakennat **Weather MCP Serverin**, joka demonstroi:
- Mukautetun MCP-palvelimen toteutusta
- Integraatiota Microsoft Foundry Toolkit Agent Builderin kanssa
- Ammattimaisia virheenkorjausprosessseja
- Modernin MCP SDK:n käyttötapoja

---

## 🔧 Keskeiset komponentit yleiskuva

### 🐍 MCP Python SDK
Model Context Protocolin Python SDK tarjoaa perustan mukautettujen MCP-palvelimien rakentamiselle. Käytät versiota 1.9.3, jossa on parannetut virheenkorjausmahdollisuudet.

### 🔍 MCP Inspector
Tehokas virheenkorjaustyökalu, joka tarjoaa:
- Palvelimen reaaliaikaisen valvonnan
- Työkalujen suorituksen visualisoinnin
- Verkko-pyyntöjen ja -vastauksien tarkastelun
- Interaktiivisen testausympäristön

---

## 📖 Vaihe vaiheelta toteutus

### Vaihe 1: Luo WeatherAgent Agent Builderissa

1. **Käynnistä Agent Builder** VS Codessa Microsoft Foundry Toolkit -laajennuksen kautta
2. **Luo uusi agentti** seuraavilla asetuksilla:
   - Agentin nimi: `WeatherAgent`

![Agentin luonti](../../../../translated_images/fi/Agent.c9c33f6a412b4cde.webp)

### Vaihe 2: Aloita MCP-palvelinprojekti

1. **Siirry Tools** → **Add Tool** Agent Builderissa
2. **Valitse "MCP Server"** saatavilla olevista vaihtoehdoista
3. **Valitse "Create A new MCP Server"**
4. **Valitse `python-weather`-pohja**
5. **Nimeä palvelimesi:** `weather_mcp`

![Python-pohjan valinta](../../../../translated_images/fi/Pythontemplate.9d0a2913c6491500.webp)

### Vaihe 3: Avaa ja tarkastele projektia

1. **Avaa luotu projekti** VS Codessa
2. **Tarkastele projektin rakennetta:**
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

### Vaihe 4: Päivitä uusimpaan MCP SDK:han

> **🔍 Miksi päivittää?** Haluamme käyttää uusinta MCP SDK:ta (v1.9.3) ja Inspector-palvelua (0.14.0) parannettujen ominaisuuksien ja paremman virheenkorjauksen saavuttamiseksi.

#### 4a. Päivitä Python-riippuvuudet

**Muokkaa `pyproject.toml`:** päivitä [./code/weather_mcp/pyproject.toml](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/pyproject.toml)


#### 4b. Päivitä Inspectorin konfiguraatio

**Muokkaa `inspector/package.json`:** päivitä [./code/weather_mcp/inspector/package.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package.json)

#### 4c. Päivitä Inspectorin riippuvuudet

**Muokkaa `inspector/package-lock.json`:** päivitä [./code/weather_mcp/inspector/package-lock.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package-lock.json)

> **📝 Huom:** Tämä tiedosto sisältää laajat riippuvuusmäärittelyt. Alla on oleellinen rakenne - koko sisältö varmistaa riippuvuuksien oikean ratkaisun.


> **⚡ Täysi Package Lock:** Täysi package-lock.json sisältää noin 3000 riviä riippuvuuksien määrittelyjä. Yllä on avainrakenne - käytä toimitettua tiedostoa täydelliseen riippuvuuksien ratkaisuun.

### Vaihe 5: Määritä VS Coden virheenkorjaus

*Huom. Kopioi tiedosto ilmoitettuun polkuun korvaamaan vastaava paikallinen tiedosto*

#### 5a. Päivitä käynnistyskonfiguraatio

**Muokkaa `.vscode/launch.json`:**

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

**Muokkaa `.vscode/tasks.json`:**

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

## 🚀 MCP-palvelimen ajaminen ja testaaminen

### Vaihe 6: Asenna riippuvuudet

Muutosten tekemisen jälkeen suorita seuraavat komennot:

**Asenna Python-riippuvuudet:**
```bash
uv sync
```

**Asenna Inspectorin riippuvuudet:**
```bash
cd inspector
npm install
```

### Vaihe 7: Virheenkorjaus Agent Builderissa

1. **Paina F5** tai käytä **"Debug in Agent Builder"** -konfiguraatiota
2. **Valitse yhdistelmäkonfiguraatio** debug-paneelista
3. **Odota palvelimen käynnistymistä** ja Agent Builderin avaamista
4. **Testaa Weather MCP serveriäsi** luonnollisilla kielipyyntöillä

Anna syöte kuten tämä

SYSTEM_PROMPT

```
You are my weather assistant
```

USER_PROMPT

```
How's the weather like in Seattle
```

![Agent Builder Debug-tulos](../../../../translated_images/fi/Result.6ac570f7d2b1d538.webp)

### Vaihe 8: Virheenkorjaus MCP Inspectorilla

1. **Käytä "Debug in Inspector"** -konfiguraatiota (Edge tai Chrome)
2. **Avaa Inspector-käyttöliittymä** osoitteessa `http://localhost:6274`
3. **Tutki interaktiivista testausympäristöä:**
   - Katso saatavilla olevat työkalut
   - Testaa työkalujen suoritus
   - Tarkkaile verkkopyyntöjä
   - Virheenkorjaa palvelimen vastauksia

![MCP Inspector -käyttöliittymä](../../../../translated_images/fi/Inspector.5672415cd02fe873.webp)

---

## 🎯 Keskeiset oppimistulokset

Tämän laboratorion suorittamalla olet:

- [x] **Luonut mukautetun MCP-palvelimen** Microsoft Foundry Toolkit -pohjien avulla
- [x] **Päivittänyt uusimpaan MCP SDK:han** (v1.9.3) parennetun toiminnallisuuden saavuttamiseksi
- [x] **Määrittänyt ammattimaiset virheenkorjausprosessit** sekä Agent Builderille että Inspectorille
- [x] **Asentanut MCP Inspectorin** interaktiiviseen palvelintestaukseen
- [x] **Hallinnut VS Code -virheenkorjauskonfiguraatiot** MCP-kehitystä varten

## 🔧 Tutkitut edistyneet ominaisuudet

| Ominaisuus            | Kuvaus                          | Käyttötapaus              |
|-----------------------|--------------------------------|---------------------------|
| **MCP Python SDK v1.9.3**  | Uusin protokollatoteutus        | Moderni palvelinkehitys   |
| **MCP Inspector 0.14.0**   | Interaktiivinen virheenkorjaustyökalu | Reaaliaikainen palvelintestaus |
| **VS Code Debugging**      | Integroitu kehitysympäristö     | Ammattimainen virheenkorjaus |
| **Agent Builder Integration** | Suora yhteys Microsoft Foundry Toolkit -työkaluun | Päätä-päähän agenttitestaus |

## 📚 Lisäresurssit

- [MCP Python SDK Documentation](https://modelcontextprotocol.io/docs/sdk/python)
- [Microsoft Foundry Toolkit Extension Guide](https://code.visualstudio.com/docs/ai/ai-toolkit)
- [VS Code Debugging Documentation](https://code.visualstudio.com/docs/editor/debugging)
- [Model Context Protocol Specification](https://modelcontextprotocol.io/docs/concepts/architecture)

---

**🎉 Onneksi olkoon!** Olet suorittanut Lab 3:n onnistuneesti ja osaat nyt luoda, virheenkorjata ja ottaa käyttöön mukautettuja MCP-palvelimia ammattimaisten kehitysprosessien avulla.

### 🔜 Jatka seuraavaan moduuliin

Valmis soveltamaan MCP-taitojasi käytännön kehitystyön työnkulkuun? Jatka **[Moduuliin 4: Käytännön MCP-kehitys – Mukautettu GitHub Clone Server](../lab4/README.md)**, jossa:
- Rakennat tuotantovalmiin MCP-palvelimen, joka automatisoi GitHub-repositorion hallintaa
- Toteutat GitHub-repositorion kloonaustoiminnallisuuden MCP:n avulla
- Integroi mukautetut MCP-palvelimet VS Coden ja GitHub Copilot Agent Moden kanssa
- Testaat ja otat käyttöön mukautetut MCP-palvelimet tuotantoympäristöissä
- Opit käytännön työnkulkuautomaatioita kehittäjille

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty käyttämällä tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, otathan huomioon, että automaattiset käännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäiskielellä on virallinen lähde. Tärkeissä asioissa suositellaan ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä aiheutuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->