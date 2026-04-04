# Ilmastiku MCP server

See on näidismudel MCP serverist Pythoni keeles, mis rakendab ilmastikutööriistu koos maksetud vastustega. Seda saab kasutada oma MCP serveri alusena. See sisaldab järgmisi funktsioone:

- **Ilmastikutööriist**: Tööriist, mis annab makstud ilmastikuinfo vastavalt antud asukohale.
- **Git Cloni tööriist**: Tööriist, mis kloonib git repote kindlasse kausta.
- **VS Code ava tööriist**: Tööriist, mis avab kausta VS Code’is või VS Code Insiders’is.
- **Ühenda Agent Builderiga**: Funktsioon, mis võimaldab ühendada MCP server Agent Builderiga testimiseks ja silumiseks.
- **Silumine [MCP Inspectoris](https://github.com/modelcontextprotocol/inspector)**: Funktsioon, mis võimaldab MCP serverit siluda MCP Inspectori abil.

## Alusta Weather MCP Serveri malliga

> **Nõudmised**
>
> MCP serveri käivitamiseks oma lokaalses arendusmasinas vajad:
>
> - [Python](https://www.python.org/)
> - [Git](https://git-scm.com/) (nõutud git_clone_repo tööriistale)
> - [VS Code](https://code.visualstudio.com/) või [VS Code Insiders](https://code.visualstudio.com/insiders/) (nõutud open_in_vscode tööriistale)
> - (*Valikuline - kui eelistad uv*) [uv](https://github.com/astral-sh/uv)
> - [Python Debuggeri laiendus](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Keskkonna ettevalmistamine

Selle projekti keskkonna seadistamiseks on kaks võimalust. Võid valida endale sobivaima.

> Märkus: Pärast virtuaalkeskkonna loomist lae VSCode või terminal uuesti, et kasutataks virtuaalse keskkonna pythoni.

| Meetod | Sammud |
| -------- | ----- |
| `uv` kasutamine | 1. Loo virtuaalkeskkond: `uv venv` <br>2. Käivita VSCode käsk "***Python: Select Interpreter***" ja vali loodud virtuaalkeskkonna python <br>3. Paigalda sõltuvused (ka arendus-sõltuvused): `uv pip install -r pyproject.toml --extra dev` |
| `pip` kasutamine | 1. Loo virtuaalkeskkond: `python -m venv .venv` <br>2. Käivita VSCode käsk "***Python: Select Interpreter***" ja vali loodud virtuaalkeskkonna python<br>3. Paigalda sõltuvused (ka arendus-sõltuvused): `pip install -e .[dev]` |

Pärast keskkonna seadistamist saad serveri oma lokaalses arendusmasinas Agent Builderi kaudu MCP kliendina käivitada:
1. Ava VS Code silumispaneel. Vali `Debug in Agent Builder` või vajuta `F5`, et alustada MCP serveri silumist.
2. Kasuta AI Toolkit Agent Builderit, et testida serverit [sellega promptiga](../../../../../../../../../../../open_prompt_builder). Server ühendub automaatselt Agent Builderiga.
3. Kliki `Run`, et promptiga serverit testida.

**Palju õnne!** Sa käivitasid edukalt Weather MCP Serveri oma lokaalses arendusmasinas Agent Builderi kaudu MCP kliendina.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Mida mall sisaldab

| Kaust / fail | Sisu |
| ------------ | -------------------------------------------- |
| `.vscode`    | VSCode failid silumiseks                      |
| `.aitk`      | AI Toolkiti konfiguratsioonid                  |
| `src`        | Ilmastiku MCP serveri lähtekood                |

## Kuidas siluda Weather MCP Serverit

> Märkused:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) on visuaalne arendustööriist MCP serverite testimiseks ja silumiseks.
> - Kõik silumisrežiimid toetavad murdepunkte, nii et saad lisada murdepunkte tööriista koodi implementeerimisse.

## Saadaval olevad tööriistad

### Ilmastiku tööriist
`get_weather` tööriist annab makstud ilmastikuinfo määratud asukoha kohta.

| Parameeter | Tüüp   | Kirjeldus                     |
| ---------- | ------ | ----------------------------- |
| `location` | string | Asukoht, mille kohta ilma küsida (nt linnanimi, maakond või koordinaadid) |

### Git Cloni tööriist
`git_clone_repo` tööriist kloonib git repositooriumi kindlasse kausta.

| Parameeter     | Tüüp   | Kirjeldus                            |
| -------------- | ------ | ---------------------------------- |
| `repo_url`     | string | Kloonitava git repositooriumi URL  |
| `target_folder`| string | Kausta tee, kuhu repositoorium kloonitakse |

Tööriist tagastab JSON objekti koos:
- `success`: Boole tüüp, mis näitab, kas tehing õnnestus
- `target_folder` või `error`: Kloonitud repote tee või veateade

### VS Code ava tööriist
`open_in_vscode` tööriist avab kausta VS Code’is või VS Code Insiders rakenduses.

| Parameeter    | Tüüp     | Kirjeldus                                 |
| ------------- | -------- | ----------------------------------------- |
| `folder_path` | string   | Kausta tee, mida avada                    |
| `use_insiders`| boolean (valikuline) | Kas kasutada VS Code Insidersit tavalise VS Code asemel |

Tööriist tagastab JSON objekti koos:
- `success`: Boole tüüp, mis näitab, kas operatsioon õnnestus
- `message` või `error`: Kinnitus- või veateade

| Silumise režiim | Kirjeldus | Silumise sammud |
| --------------- | --------- | --------------- |
| Agent Builder | Silu MCP serverit Agent Builderi kaudu AI Toolkitiga. | 1. Ava VS Code silumispaneel. Vali `Debug in Agent Builder` ja vajuta `F5`, et alustada MCP serveri silumist.<br>2. Kasuta AI Toolkit Agent Builderit, et testida serverit [sellega promptiga](../../../../../../../../../../../open_prompt_builder). Server ühendub automaatselt Agent Builderiga.<br>3. Kliki `Run`, et promptiga serverit testida. |
| MCP Inspector | Silu MCP serverit MCP Inspectori abil. | 1. Paigalda [Node.js](https://nodejs.org/)<br> 2. Seadista Inspector: `cd inspector` && `npm install` <br> 3. Ava VS Code silumispaneel. Vali `Debug SSE in Inspector (Edge)` või `Debug SSE in Inspector (Chrome)`. Vajuta `F5`, et alustada silumist.<br> 4. Kui MCP Inspector avaneb brauseris, kliki `Connect`, et selle MCP serveriga ühendada.<br> 5. Seejärel saad `List Tools`, valida tööriista, sisestada parameetrid ja `Run Tool`, et serveri koodi siluda.<br> |

## Vaikimisi pordid ja kohandused

| Silumise režiim | Pordid | Määratlused | Kohandused | Märkus |
| --------------- | ------ | ----------- | ---------- | ------ |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | Muuda [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json), et muuta ülaltoodud porte. | Puudub |
| MCP Inspector | 3001 (server); 5173 ja 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | Muuda [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json), et muuta ülaltoodud porte.| Puudub |

## Tagasiside

Kui sul on selle malli kohta tagasisidet või ettepanekuid, palun ava teema [AI Toolkiti GitHubi repos](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastutusest loobumine**:  
See dokument on tõlgitud kasutades tehisintellektipõhist tõlketeenust [Co-op Translator](https://github.com/Azure/co-op-translator). Kuigi me püüame täpsust, palun arvestage, et automatiseeritud tõlked võivad sisaldada vigu või ebatäpsusi. Originaaldokument selle emakeeles tuleks lugeda autoriteetseks allikaks. Kriitilise tähtsusega teabe puhul soovitatakse kasutada professionaalse inimese tehtud tõlget. Me ei vastuta selle tõlkega seotud väärarusaamade ega valesti mõistmiste eest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->