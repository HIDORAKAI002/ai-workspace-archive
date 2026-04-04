# Weather MCP Server

Huu ni mfano wa MCP Server katika Python unaotekeleza zana za hali ya hewa na majibu ya kuigiza. Inaweza kutumika kama muundo wa MCP Server yako mwenyewe. Inajumuisha vipengele vifuatavyo: 

- **Zana ya Hali ya Hewa**: Zana inayotoa taarifa za hali ya hewa zilizodanganywa kulingana na eneo lililowekwa.
- **Unganisha na Agent Builder**: Kipengele kinachokuwezesha kuunganisha MCP server na Agent Builder kwa ajili ya majaribio na utatuzi hitilafu.
- **Tafuta Hitilafu katika [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: Kipengele kinachokuwezesha kutafuta hitilafu za MCP Server kwa kutumia MCP Inspector.

## Anza na kiolezo cha Weather MCP Server

> **Mahitaji ya Awali**
>
> Ili kuendesha MCP Server kwenye mashine yako ya maendeleo ya ndani, utahitaji:
>
> - [Python](https://www.python.org/)
> - (*Hiari - ikiwa unapendelea uv*) [uv](https://github.com/astral-sh/uv)
> - Upanuzi wa Kichunguzi cha Python ([Python Debugger Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy))

## Tayarisha mazingira

Kuna njia mbili za kuanzisha mazingira kwa mradi huu. Unaweza kuchagua moja kulingana na upendeleo wako.

> Kumbuka: Reload VSCode au terminal kuhakikisha python wa mazingira pepe unatumika baada ya kuunda mazingira pepe.

| Njia | Hatua |
| -------- | ----- |
| Kutumia `uv` | 1. Unda mazingira pepe: `uv venv` <br>2. Endesha Amri ya VSCode "***Python: Select Interpreter***" na chagua python kutoka mazingira pepe yaliyoundwa <br>3. Sakinisha utegemezi (ikiwa ni pamoja na utegemezi wa maendeleo): `uv pip install -r pyproject.toml --extra dev` |
| Kutumia `pip` | 1. Unda mazingira pepe: `python -m venv .venv` <br>2. Endesha Amri ya VSCode "***Python: Select Interpreter***" na chagua python kutoka mazingira pepe yaliyoundwa<br>3. Sakinisha utegemezi (ikiwa ni pamoja na utegemezi wa maendeleo): `pip install -e .[dev]` | 

Baada ya kuanzisha mazingira, unaweza kuendesha server kwenye mashine yako ya maendeleo ya ndani kupitia Agent Builder kama MCP Client ili kuanza:
1. Fungua paneli ya Debug ya VS Code. Chagua `Debug in Agent Builder` au bonyeza `F5` kuanza kutatua hitilafu za MCP server.
2. Tumia AI Toolkit Agent Builder kujaribu server kwa [maombi haya](../../../../../../../../../../../open_prompt_builder). Server itakuwa imeunganishwa moja kwa moja na Agent Builder.
3. Bonyeza `Run` kujaribu server kwa maombi.

**Hongera**! Umefanikiwa kuendesha Weather MCP Server kwenye mashine yako ya maendeleo ya ndani kupitia Agent Builder kama MCP Client.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Kile kilichojumuishwa katika kiolezo

| Folda / Faili| Maudhui                                    |
| ------------ | ------------------------------------------ |
| `.vscode`    | Faili za VSCode kwa ajili ya kutatua hitilafu |
| `.aitk`      | Mipangilio ya AI Toolkit                    |
| `src`        | Msimbo wa chanzo wa weather mcp server      |

## Jinsi ya kutafuta hitilafu za Weather MCP Server

> Vidokezo:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) ni chombo cha kuona kwa mwendelezaji kwa ajili ya majaribio na utatuzi wa MCP servers.
> - Njia zote za utatuzi zinasaidia breakpoints, hivyo unaweza kuongeza breakpoints kwenye msimbo wa utekelezaji wa zana.

| Njia ya Utatuzi | Maelezo | Hatua za kutatua hitilafu |
| ---------- | ----------- | --------------- |
| Agent Builder | Tatua MCP server ndani ya Agent Builder kupitia AI Toolkit. | 1. Fungua paneli ya Debug ya VS Code. Chagua `Debug in Agent Builder` na bonyeza `F5` kuanza kutatua hitilafu za MCP server.<br>2. Tumia AI Toolkit Agent Builder kujaribu server kwa [maombi haya](../../../../../../../../../../../open_prompt_builder). Server itakuwa imeunganishwa moja kwa moja na Agent Builder.<br>3. Bonyeza `Run` kujaribu server na maombi. |
| MCP Inspector | Tatua MCP server kwa kutumia MCP Inspector. | 1. Sakinisha [Node.js](https://nodejs.org/)<br> 2. Weka Inspector: `cd inspector` && `npm install` <br> 3. Fungua paneli ya Debug ya VS Code. Chagua `Debug SSE in Inspector (Edge)` au `Debug SSE in Inspector (Chrome)`. Bonyeza F5 kuanza kutatua hitilafu.<br> 4. MCP Inspector itakapozinduliwa katika kivinjari, bonyeza kitufe cha `Connect` kuungana na MCP server hii.<br> 5. Baada yake unaweza `List Tools`, chagua zana, ingiza vigezo, na `Run Tool` kutatua hitilafu za msimbo wa server yako.<br> |

## Bandari za Kawaida na mabadiliko

| Njia ya Utatuzi | Bandari | Maelezo | Mabadiliko | Kumbuka |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Hariri [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) kubadilisha bandari zilizotajwa hapo juu. | Haijafafanuliwa |
| MCP Inspector | 3001 (Server); 5173 na 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Hariri [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) kubadilisha bandari zilizotajwa hapo juu.| Haijafafanuliwa |

## Maoni

Ikiwa una maoni au mapendekezo kuhusu kiolezo hiki, tafadhali fungua tatizo kwenye [AI Toolkit GitHub repository](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Kiadhibu**:  
Hati hii imetafsiriwa kwa kutumia huduma ya kutafsiri kwa AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kuhakikisha usahihi, tafadhali fahamu kuwa tafsiri za kiotomatiki zinaweza kuwa na makosa au upotoshaji. Hati ya asili katika lugha yake ya asili inapaswa kuchukuliwa kama chanzo cha kuaminika. Kwa taarifa muhimu, inashauriwa kutumia huduma ya mtafsiri mtaalamu wa binadamu. Hatuna dhamana kwa dhana potofu au tafsiri mbaya zitokanazo na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->