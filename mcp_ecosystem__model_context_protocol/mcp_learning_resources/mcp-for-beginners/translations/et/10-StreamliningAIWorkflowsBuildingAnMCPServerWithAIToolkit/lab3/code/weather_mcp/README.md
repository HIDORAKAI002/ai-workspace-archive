# Ilma MCP server

See on näidis MCP-server Pythoni keeles, mis rakendab ilma tööriistu koos imiteeritud vastustega. Seda saab kasutada oma MCP-serveri raamistiku alusena. See sisaldab järgmisi funktsioone:

- **Ilmatööriist**: tööriist, mis pakub antud asukoha põhjal imiteeritud ilmainfot.
- **Ühendamine Agent Builderiga**: omadus, mis võimaldab MCP-serveri ühendamist Agent Builderiga testimiseks ja silumiseks.
- **Silumine rakenduses [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: omadus, mis võimaldab MCP-serverit siluda, kasutades MCP Inspectorit.

## Alustamine Ilma MCP serveri malliga

> **Eeltingimused**
>
> MCP-serveri käivitamiseks oma lokaalsel arendusseadmel on sul vaja:
>
> - [Pythoni](https://www.python.org/)
> - (*Valikuline – kui eelistad uv-d*) [uv](https://github.com/astral-sh/uv)
> - [Pythoni silumispikendus](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Keskkonna ettevalmistamine

Selle projekti keskkonna seadistamiseks on kaks võimalust. Sa võid valida endale sobivaima.

> Märkus: On soovitatav laadida VSCode või terminal uuesti, et pärast virtuaalse keskkonna loomist kasutataks õiget pythonit.

| Lähenemisviis | Sammud |
| ------------- | ------ |
| Kasutades `uv` | 1. Loo virtuaalne keskkond: `uv venv` <br>2. Käivita VSCode käsk "***Python: Select Interpreter***" ja vali loodud virtuaalse keskkonna python <br>3. Paigalda sõltuvused (sh arendus-sõltuvused): `uv pip install -r pyproject.toml --extra dev` |
| Kasutades `pip` | 1. Loo virtuaalne keskkond: `python -m venv .venv` <br>2. Käivita VSCode käsk "***Python: Select Interpreter***" ja vali loodud virtuaalse keskkonna python <br>3. Paigalda sõltuvused (sh arendus-sõltuvused): `pip install -e .[dev]` | 

Pärast keskkonna seadmestamist saad serveri oma lokaalsel arendusseadmel Agent Builderi kaudu MCP kliendina käivitada, et alustada:
1. Ava VS Code silumise paneel. Vali `Debug in Agent Builder` või vajuta `F5`, et alustada MCP serveri silumist.
2. Kasuta Microsoft Foundry Toolkit Agent Builderit, et testida serverit [sellega käsklusega](../../../../../../../../../../../open_prompt_builder). Server ühendub Automaatselt Agent Builderiga.
3. Klõpsa `Run`, et testida serverit antud käsklusega.

**Palju õnne!** Oled edukalt käivitanud Ilma MCP serveri oma lokaalsel arendusseadmel Agent Builderi kaudu MCP kliendina.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Mida mall sisaldab

| Kaust / Fail | Sisu                                          |
| ------------ | --------------------------------------------- |
| `.vscode`    | VSCode failid silumise jaoks                  |
| `.aitk`      | Konfiguratsioonid Microsoft Foundry Toolkitile |
| `src`        | Allikakood ilma mcp serveri jaoks             |

## Kuidas siluda Ilma MCP serverit

> Märkused:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) on visuaalne arendustööriist MCP serverite testimiseks ja silumiseks.
> - Kõik silumismeetodid toetavad murrupunkte, seega saad lisada murrupunkte tööriista rakenduskoodi.

| Silumismeetod | Kirjeldus | Silumise sammud |
| ------------- | --------- | -------------- |
| Agent Builder | MCP serveri silumine Agent Builderis Microsoft Foundry Toolkiti kaudu. | 1. Ava VS Code silumise paneel. Vali `Debug in Agent Builder` ja vajuta `F5`, et alustada MCP serveri silumist.<br>2. Kasuta Microsoft Foundry Toolkit Agent Builderit, et testida serverit [sellega käsklusega](../../../../../../../../../../../open_prompt_builder). Server ühendub automaatselt Agent Builderiga.<br>3. Klõpsa `Run`, et testida serverit antud käsklusega. |
| MCP Inspector | MCP serveri silumine MCP Inspectoriga. | 1. Paigalda [Node.js](https://nodejs.org/)<br> 2. Valmista Inspector: `cd inspector` && `npm install` <br> 3. Ava VS Code silumise paneel. Vali `Debug SSE in Inspector (Edge)` või `Debug SSE in Inspector (Chrome)`. Vajuta F5, et alustada silumist.<br> 4. Kui MCP Inspector käivitub brauseris, klõpsa `Connect`, et ühendada see MCP server.<br> 5. Seejärel saad `List Tools` käskluse abil valida tööriista, sisestada parameetrid ja `Run Tool`-ga oma serveri koodi siluda.<br> |

## Vaikimisi pordid ja kohandused

| Silumismeetod | Pordid | Definitsioonid | Kohandused | Märkus |
| ------------- | ------ | ------------- | ---------- | ------ |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Muuda [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json), et muuta ülaltoodud porte. | Puudub |
| MCP Inspector | 3001 (server); 5173 ja 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Muuda [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json), et muuta ülaltoodud porte. | Puudub |

## Tagasiside

Kui sul on selle malli kohta tagasisidet või ettepanekuid, palun ava teema [Microsoft Foundry Toolkit GitHubi hoidlasse](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Lahtiütlus**:
See dokument on tõlgitud kasutades AI tõlketeenust [Co-op Translator](https://github.com/Azure/co-op-translator). Kuigi me püüdleme täpsuse poole, palun pange tähele, et automatiseeritud tõlgetes võib esineda vigu või ebatäpsusi. Originaaldokument selle emakeeles tuleks pidada autoriteetseks allikaks. Olulise teabe puhul soovitatakse kasutada professionaalset inimtõlget. Me ei vastuta selle tõlkega seotud eksimustest või valesti mõistmistest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->