# Weather MCP Server

See on näidismudel MCP serverist Pythonis, mis rakendab ilma tööriistu koos näidisdomeenidega. Seda saab kasutada oma MCP serveri alusena. See sisaldab järgmisi funktsioone:

- **Ilmatööriist**: tööriist, mis annab näidisdomeenidel põhinevat ilma infot vastavalt antud asukohale.
- **Ühenda Agent Builderiga**: funktsioon, mis võimaldab ühendada MCP server Agent Builderiga testimiseks ja silumiseks.
- **Silumine [MCP Inspectoriga](https://github.com/modelcontextprotocol/inspector)**: funktsioon, mis võimaldab MCP serverit siluda kasutades MCP Inspectori.

## Alustamine Weather MCP Serveri malliga

> **Eeltingimused**
>
> Selleks, et MCP serverit käivitada oma lokaalsel arendusmasinal, vajad:
>
> - [Python](https://www.python.org/)
> - (*Valikuline - kui eelistad uv-d*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Keskkonna ettevalmistamine

Selle projekti keskkonna seadistamiseks on kaks lähenemist. Võid valida endale sobivaima.

> Märkus: Taaskäivita VSCode või terminal, et pärast virtuaalkeskkonna loomist kasutataks virtuaalset Pythoni.

| Lähenemine | Sammud |
| --------- | ------- |
| `uv` kasutamine | 1. Loo virtuaalkeskkond: `uv venv` <br>2. Käivita VSCode käsk "***Python: Select Interpreter***" ja vali loodud virtuaalkeskkonna Python <br>3. Paigalda sõltuvused (sealhulgas arendusvõimalused): `uv pip install -r pyproject.toml --extra dev` |
| `pip` kasutamine | 1. Loo virtuaalkeskkond: `python -m venv .venv` <br>2. Käivita VSCode käsk "***Python: Select Interpreter***" ja vali loodud virtuaalkeskkonna Python<br>3. Paigalda sõltuvused (sealhulgas arendusvõimalused): `pip install -e .[dev]` |

Keskkonna seadistamise järel saad serveri oma lokaalsel arendusmasinal käivitada Agent Builderi kaudu MCP kliendina, et alustada:
1. Ava VS Code silumise paneel. Vali `Debug in Agent Builder` või vajuta `F5`, et alustada MCP serveri silumist.
2. Kasuta AI Toolkit Agent Builderit, et serverit testida [selle promptiga](../../../../../../../../../../../open_prompt_builder). Server ühendub Agent Builderiga automaatselt.
3. Klõpsa `Run`, et testida serverit promptiga.

**Palju õnne**! Sul õnnestus edukalt käivitada Weather MCP Server oma lokaalsel arendusmasinal Agent Builderi kaudu MCP kliendina.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Mida mall sisaldab

| Kaust / Fail | Sisu                                               |
| ------------ | ------------------------------------------------- |
| `.vscode`    | VSCode failid silumiseks                           |
| `.aitk`      | Konfiguratsioonid AI Toolkituks                    |
| `src`        | Ilma MCP serveri lähtekood                         |

## Kuidas siluda Weather MCP Serverit

> Märkused:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) on visuaalne arendustööriist MCP serverite testimiseks ja silumiseks.
> - Kõik silumismeetodid toetavad murdepunkte, nii et saad lisada murdepunkte tööriista rakendus koodi.

| Silumise režiim | Kirjeldus | Silumise sammud |
| --------------- | --------- | --------------- |
| Agent Builder | Silu MCP serverit Agent Builderis AI Toolkit kaudu. | 1. Ava VS Code silumise paneel. Vali `Debug in Agent Builder` ja vajuta `F5`, et alustada MCP serveri silumist.<br>2. Kasuta AI Toolkit Agent Builderit, et testida serverit [selle promptiga](../../../../../../../../../../../open_prompt_builder). Server ühendub automaatselt Agent Builderiga.<br>3. Klõpsa `Run`, et testida serverit promptiga. |
| MCP Inspector | Silu MCP serverit kasutades MCP Inspectorit. | 1. Paigalda [Node.js](https://nodejs.org/)<br>2. Sea Inspector üles: `cd inspector` ja `npm install`<br>3. Ava VS Code silumise paneel. Vali `Debug SSE in Inspector (Edge)` või `Debug SSE in Inspector (Chrome)`. Vajuta `F5` silumise alustamiseks.<br>4. Kui MCP Inspector avaneb brauseris, klõpsa `Connect` nupule, et ühendada see MCP server.<br>5. Seejärel saad `List Tools` klõpsata, valida tööriista, sisestada parameetrid ja `Run Tool`, et oma serveri koodi siluda.<br> |

## Vaikesadistused ja kohandused

| Silumise režiim | Pordid | Definitsioonid | Kohandused | Märkus |
| --------------- | ------ | -------------- | ---------- | ------ |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Muuda [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json), et muuta eespool mainitud porte. | Pole |
| MCP Inspector | 3001 (Server); 5173 ja 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Muuda [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json), et muuta eespool mainitud porte. | Pole |

## Tagasiside

Kui sul on selle malli kohta tagasisidet või ettepanekuid, palun loo teema [AI Toolkit GitHubi hoidlas](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastutusest loobumine**:
See dokument on tõlgitud kasutades tehisintellektil põhinevat tõlketeenust [Co-op Translator](https://github.com/Azure/co-op-translator). Kuigi püüame täpsust, palun arvestage, et automatiseeritud tõlgetes võib esineda vigu või ebatäpsusi. Originaaldokument selle emakeeles tuleks pidada autoriteetseks allikaks. Olulise informatsiooni puhul soovitatakse kasutada professionaalset inimtõlget. Me ei vastuta selle tõlkega seotud arusaamatuste ega moonutuste eest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->