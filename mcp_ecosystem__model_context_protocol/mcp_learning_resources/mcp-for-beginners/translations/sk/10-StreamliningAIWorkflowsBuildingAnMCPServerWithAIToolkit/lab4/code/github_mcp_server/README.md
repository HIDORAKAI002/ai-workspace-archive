# Weather MCP Server

Toto je príklad MCP Servera v Pythone implementujúci nástroje pre počasie s mock odpoveďami. Môže byť použitý ako základ pre váš vlastný MCP Server. Zahŕňa nasledujúce funkcie:

- **Nástroj Počasia**: Nástroj, ktorý poskytuje maketované informácie o počasí na základe zadanej lokality.
- **Nástroj Git Clone**: Nástroj, ktorý klonuje git repozitár do špecifikovaného priečinka.
- **Nástroj VS Code Open**: Nástroj, ktorý otvorí priečinok vo VS Code alebo VS Code Insiders.
- **Pripojenie k Agent Builder**: Funkcia, ktorá umožňuje pripojiť MCP server k Agent Builderu na testovanie a ladenie.
- **Ladenie v [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: Funkcia, ktorá umožňuje ladiť MCP Server pomocou MCP Inspector.

## Začať s Weather MCP Server šablónou

> **Požiadavky**
>
> Na spustenie MCP Servera na vašom lokálnom vývojárskom počítači budete potrebovať:
>
> - [Python](https://www.python.org/)
> - [Git](https://git-scm.com/) (Potrebuje sa pre nástroj git_clone_repo)
> - [VS Code](https://code.visualstudio.com/) alebo [VS Code Insiders](https://code.visualstudio.com/insiders/) (Potrebuje sa pre nástroj open_in_vscode)
> - (*Voliteľné - ak preferujete uv*) [uv](https://github.com/astral-sh/uv)
> - [Rozšírenie Python Debugger](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Pripraviť prostredie

Existujú dva spôsoby, ako nastaviť prostredie pre tento projekt. Môžete si vybrať ktorýkoľvek podľa vašich preferencií.

> Poznámka: Preistite sa, že po vytvorení virtuálneho prostredia ste reštartovali VSCode alebo terminál, aby sa používal python z virtuálneho prostredia.

| Prístup | Kroky |
| -------- | ----- |
| Použitie `uv` | 1. Vytvorte virtuálne prostredie: `uv venv` <br>2. Spustite príkaz VSCode "***Python: Select Interpreter***" a vyberte python z vytvoreného virtuálneho prostredia <br>3. Nainštalujte závislosti (vrátane dev závislostí): `uv pip install -r pyproject.toml --extra dev` |
| Použitie `pip` | 1. Vytvorte virtuálne prostredie: `python -m venv .venv` <br>2. Spustite príkaz VSCode "***Python: Select Interpreter***" a vyberte python z vytvoreného virtuálneho prostredia<br>3. Nainštalujte závislosti (vrátane dev závislostí): `pip install -e .[dev]` |

Po nastavení prostredia môžete spustiť server na vašom lokálnom vývojovom počítači cez Agent Builder ako MCP Klient, aby ste mohli začať:
1. Otvorte panel ladenia vo VS Code. Vyberte `Debug in Agent Builder` alebo stlačte `F5` pre spustenie ladenia MCP servera.
2. Použite AI Toolkit Agent Builder na testovanie servera s [týmto promptom](../../../../../../../../../../../open_prompt_builder). Server bude automaticky pripojený k Agent Builderu.
3. Kliknite na `Run` pre testovanie servera s promptom.

**Gratulujeme**! Úspešne ste spustili Weather MCP Server na svojom lokálnom vývojovom počítači cez Agent Builder ako MCP Klient.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Čo je obsiahnuté v šablóne

| Priečinok / Súbor | Obsah                                      |
| ------------ | -------------------------------------------- |
| `.vscode`    | Súbory VSCode pre ladenie                    |
| `.aitk`      | Konfigurácie pre AI Toolkit                   |
| `src`        | Zdrojový kód MCP servera pre počasie          |

## Ako ladiť Weather MCP Server

> Poznámky:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) je vizuálny nástroj pre vývojárov na testovanie a ladenie MCP serverov.
> - Všetky režimy ladenia podporujú breakpointy, takže môžete pridať breakpointy do kódu implementácie nástrojov.

## Disponibilné nástroje

### Nástroj Počasia
Nástroj `get_weather` poskytuje maketované informácie o počasí pre zadanú lokalitu.

| Parameter | Typ | Popis |
| --------- | ---- | ----------- |
| `location` | string | Lokalita, pre ktorú sa má zistiť počasie (napr. názov mesta, štát alebo súradnice) |

### Nástroj Git Clone
Nástroj `git_clone_repo` klonuje git repozitár do špecifikovaného priečinka.

| Parameter | Typ | Popis |
| --------- | ---- | ----------- |
| `repo_url` | string | URL adresa git repozitára na klonovanie |
| `target_folder` | string | Cesta k priečinku, kam má byť repozitár sklonovaný |

Nástroj vracia JSON objekt s:
- `success`: Boolean znamenajúci, či operácia bola úspešná
- `target_folder` alebo `error`: Cesta ku klonovanému repozitáru alebo chybová správa

### Nástroj VS Code Open
Nástroj `open_in_vscode` otvorí priečinok v aplikácii VS Code alebo VS Code Insiders.

| Parameter | Typ | Popis |
| --------- | ---- | ----------- |
| `folder_path` | string | Cesta k priečinku, ktorý sa má otvoriť |
| `use_insiders` | boolean (voliteľné) | Či používať VS Code Insiders namiesto bežného VS Code |

Nástroj vracia JSON objekt s:
- `success`: Boolean znamenajúci, či operácia bola úspešná
- `message` alebo `error`: Potvrdzujúca správa alebo chybová správa

| Režim ladenia | Popis | Kroky na ladenie |
| ---------- | ----------- | --------------- |
| Agent Builder | Ladenie MCP servera v Agent Builder prostredníctvom AI Toolkit. | 1. Otvorte panel ladenia vo VS Code. Vyberte `Debug in Agent Builder` a stlačte `F5` pre spustenie ladenia MCP servera.<br>2. Použite AI Toolkit Agent Builder na testovanie servera s [týmto promptom](../../../../../../../../../../../open_prompt_builder). Server bude automaticky pripojený k Agent Builderu.<br>3. Kliknite na `Run` pre test servera s promptom. |
| MCP Inspector | Ladenie MCP servera pomocou MCP Inspector. | 1. Nainštalujte [Node.js](https://nodejs.org/)<br> 2. Nastavte Inspector: `cd inspector` && `npm install` <br> 3. Otvorte panel ladenia vo VS Code. Vyberte `Debug SSE in Inspector (Edge)` alebo `Debug SSE in Inspector (Chrome)`. Stlačte F5 pre spustenie ladenia.<br> 4. Keď sa MCP Inspector spustí v prehliadači, kliknite na tlačidlo `Connect`, aby ste pripojili tento MCP server.<br> 5. Následne môžete `List Tools`, vybrať nástroj, zadať parametre a `Run Tool` pre ladenie kódu servera.<br> |

## Predvolené porty a prispôsobenia

| Režim ladenia | Porty | Definície | Prispôsobenia | Poznámka |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | Upravte [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) pre zmenu vyššie uvedených portov. | N/A |
| MCP Inspector | 3001 (Server); 5173 a 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | Upravte [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) pre zmenu vyššie uvedených portov.| N/A |

## Spätná väzba

Ak máte akúkoľvek spätnú väzbu alebo návrhy k tejto šablóne, prosím, otvorte issue na [AI Toolkit GitHub repozitári](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Upozornenie**:  
Tento dokument bol preložený pomocou AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Aj keď sa snažíme o presnosť, majte, prosím, na pamäti, že automatické preklady môžu obsahovať chyby alebo nepresnosti. Pôvodný dokument v jeho rodnom jazyku by mal byť považovaný za autoritatívny zdroj. Pre dôležité informácie sa odporúča profesionálny ľudský preklad. Nie sme zodpovední za akékoľvek nepochopenia alebo nesprávne interpretácie vyplývajúce z použitia tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->