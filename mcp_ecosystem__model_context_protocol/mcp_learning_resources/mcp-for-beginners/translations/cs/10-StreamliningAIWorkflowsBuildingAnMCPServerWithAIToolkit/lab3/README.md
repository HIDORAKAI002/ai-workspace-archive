# 🔧 Modul 3: Pokročilý vývoj MCP s Microsoft Foundry Toolkit

![Duration](https://img.shields.io/badge/Duration-20_minutes-blue?style=flat-square)
![Microsoft Foundry Toolkit](https://img.shields.io/badge/Microsoft_Foundry_Toolkit-Required-orange?style=flat-square)
![Python](https://img.shields.io/badge/Python-3.10+-green?style=flat-square)
![MCP SDK](https://img.shields.io/badge/MCP_SDK-1.9.3-purple?style=flat-square)
![Inspector](https://img.shields.io/badge/MCP_Inspector-0.14.0-blue?style=flat-square)

## 🎯 Výukové cíle

Na konci tohoto laboratoře budete schopni:

- ✅ Vytvořit vlastní MCP servery pomocí Microsoft Foundry Toolkit
- ✅ Nakonfigurovat a používat nejnovější MCP Python SDK (verze 1.9.3)
- ✅ Nastavit a využít MCP Inspector pro ladění
- ✅ Ladit MCP servery jak v prostředí Agent Builder, tak v Inspectoru
- ✅ Pochopit pokročilé pracovní postupy vývoje MCP serverů

## 📋 Předpoklady

- Dokončení Laboratoře 2 (Základy MCP)
- VS Code s nainstalovaným rozšířením Microsoft Foundry Toolkit
- Python 3.10+ prostředí
- Node.js a npm pro nastavení Inspectoru

## 🏗️ Co vytvoříte

V této laboratoři vytvoříte **Weather MCP Server**, který demonstruje:
- Implementaci vlastního MCP serveru
- Integraci s Microsoft Foundry Toolkit Agent Builderem
- Profesionální pracovní postupy ladění
- Moderní vzory použití MCP SDK

---

## 🔧 Přehled základních komponent

### 🐍 MCP Python SDK
Model Context Protocol Python SDK poskytuje základy pro vytváření vlastních MCP serverů. Použijete verzi 1.9.3 s rozšířenými možnostmi ladění.

### 🔍 MCP Inspector
Výkonný nástroj pro ladění, který nabízí:
- Monitorování serveru v reálném čase
- Vizualizaci spouštění nástrojů
- Kontrolu síťových požadavků/odpovědí
- Interaktivní testovací prostředí

---

## 📖 Implementace krok za krokem

### Krok 1: Vytvoření WeatherAgenta v Agent Builderu

1. **Spusťte Agent Builder** ve VS Code přes rozšíření Microsoft Foundry Toolkit
2. **Vytvořte nového agenta** s následující konfigurací:
   - Název agenta: `WeatherAgent`

![Agent Creation](../../../../translated_images/cs/Agent.c9c33f6a412b4cde.webp)

### Krok 2: Inicializace projektu MCP serveru

1. **Přejděte do Tools** → **Add Tool** v Agent Builderu
2. **Vyberte "MCP Server"** z dostupných možností
3. **Zvolte "Create A new MCP Server"**
4. **Vyberte šablonu `python-weather`**
5. **Pojmenujte svůj server:** `weather_mcp`

![Python Template Selection](../../../../translated_images/cs/Pythontemplate.9d0a2913c6491500.webp)

### Krok 3: Otevřete a prozkoumejte projekt

1. **Otevřete vygenerovaný projekt** v VS Code
2. **Prohlédněte si strukturu projektu:**
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

### Krok 4: Aktualizace na nejnovější MCP SDK

> **🔍 Proč aktualizovat?** Chceme používat nejnovější MCP SDK (verze 1.9.3) a službu Inspector (0.14.0) pro rozšířené funkce a lepší možnosti ladění.

#### 4a. Aktualizace Python závislostí

**Upravte `pyproject.toml`:** aktualizujte [./code/weather_mcp/pyproject.toml](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/pyproject.toml)


#### 4b. Aktualizace konfigurace Inspectoru

**Upravte `inspector/package.json`:** aktualizujte [./code/weather_mcp/inspector/package.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package.json)

#### 4c. Aktualizace závislostí Inspectoru

**Upravte `inspector/package-lock.json`:** aktualizujte [./code/weather_mcp/inspector/package-lock.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package-lock.json)

> **📝 Poznámka:** Tento soubor obsahuje rozsáhlé definice závislostí. Níže je základní struktura – celý obsah zajišťuje správné vyřešení závislostí.


> **⚡ Kompletní zámek balíčků:** Kompletní package-lock.json má ~3000 řádků definic závislostí. Výše uvedená ukázka obsahuje klíčovou strukturu – pro úplné vyřešení závislostí použijte poskytnutý soubor.

### Krok 5: Konfigurace ladění ve VS Code

*Poznámka: Prosím zkopírujte soubor na určené cestě tak, aby nahradil odpovídající lokální soubor*

#### 5a. Aktualizace konfiguračního souboru spuštění

**Upravte `.vscode/launch.json`:**

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

**Upravte `.vscode/tasks.json`:**

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

## 🚀 Spuštění a testování vašeho MCP serveru

### Krok 6: Instalace závislostí

Po provedení konfiguračních změn spusťte následující příkazy:

**Instalace Python závislostí:**
```bash
uv sync
```

**Instalace závislostí Inspectoru:**
```bash
cd inspector
npm install
```

### Krok 7: Ladění v Agent Builderu

1. **Stiskněte F5** nebo použijte konfiguraci **"Debug in Agent Builder"**
2. **Vyberte složenou konfiguraci** z ladícího panelu
3. **Počkejte na spuštění serveru** a otevření Agent Builderu
4. **Otestujte svůj weather MCP server** pomocí dotazů v přirozeném jazyce

Zadejte prompt jako tento

SYSTEM_PROMPT

```
You are my weather assistant
```

USER_PROMPT

```
How's the weather like in Seattle
```

![Agent Builder Debug Result](../../../../translated_images/cs/Result.6ac570f7d2b1d538.webp)

### Krok 8: Ladění v MCP Inspectoru

1. **Použijte konfiguraci "Debug in Inspector"** (Edge nebo Chrome)
2. **Otevřete rozhraní Inspectoru** na adrese `http://localhost:6274`
3. **Prozkoumejte interaktivní testovací prostředí:**
   - Prohlížejte dostupné nástroje
   - Testujte spouštění nástrojů
   - Sledujte síťové požadavky
   - Laděte odpovědi serveru

![MCP Inspector Interface](../../../../translated_images/cs/Inspector.5672415cd02fe873.webp)

---

## 🎯 Klíčové dosažené výsledky

Úspěšným dokončením této laboratoře jste:

- [x] **Vytvořili vlastní MCP server** pomocí šablon Microsoft Foundry Toolkit
- [x] **Aktualizovali na nejnovější MCP SDK** (verze 1.9.3) pro rozšířenou funkcionalitu
- [x] **Nakonfigurovali profesionální pracovní postupy ladění** pro Agent Builder i Inspector
- [x] **Nastavili MCP Inspector** pro interaktivní testování serveru
- [x] **Ovládáte konfigurace ladění ve VS Code** pro vývoj MCP

## 🔧 Prozkoumané pokročilé funkce

| Funkce | Popis | Případ použití |
|---------|-------------|----------|
| **MCP Python SDK v1.9.3** | Nejnovější implementace protokolu | Moderní vývoj serverů |
| **MCP Inspector 0.14.0** | Interaktivní nástroj pro ladění | Testování serveru v reálném čase |
| **Ladění ve VS Code** | Integrované vývojové prostředí | Profesionální pracovní postup ladění |
| **Integrace s Agent Builderem** | Přímé propojení s Microsoft Foundry Toolkit | Kompletní testování agenta |

## 📚 Další zdroje

- [Dokumentace MCP Python SDK](https://modelcontextprotocol.io/docs/sdk/python)
- [Průvodce rozšířením Microsoft Foundry Toolkit](https://code.visualstudio.com/docs/ai/ai-toolkit)
- [Dokumentace k ladění ve VS Code](https://code.visualstudio.com/docs/editor/debugging)
- [Specifikace Model Context Protocol](https://modelcontextprotocol.io/docs/concepts/architecture)

---

**🎉 Gratulujeme!** Úspěšně jste dokončili Laboratoř 3 a nyní můžete vytvářet, ladit a nasazovat vlastní MCP servery využívajíc profesionální pracovní postupy vývoje.

### 🔜 Pokračujte do dalšího modulu

Jste připraveni aplikovat své MCP dovednosti v reálném vývojovém workflow? Pokračujte do **[Modulu 4: Praktický vývoj MCP - Vlastní server klonování GitHubu](../lab4/README.md)**, kde:
- Vytvoříte produkčně připravený MCP server automatizující operace s repozitáři GitHubu
- Implementujete funkci klonování repozitářů GitHub přes MCP
- Integrujete vlastní MCP servery s VS Code a režimem agenta GitHub Copilot
- Testujete a nasadíte vlastní MCP servery v produkčním prostředí
- Naučíte se praktickou automatizaci pracovních toků pro vývojáře

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o omezení odpovědnosti**:
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o co největší přesnost, mějte prosím na paměti, že automatizované překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho mateřském jazyce by měl být považován za autoritativní zdroj. Pro kritické informace se doporučuje profesionální lidský překlad. Nejsme odpovědní za jakékoli nedorozumění nebo nesprávné interpretace vzniklé použitím tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->