# Weather MCP Server

Hii ni mfano wa MCP Server katika Python unaotekeleza zana za hali ya hewa kwa majibu ya mfano. Inaweza kutumika kama mchoro kwa MCP Server yako mwenyewe. Inajumuisha vipengele vifuatavyo: 

- **Zana ya Hali ya Hewa**: Zana inayotoa taarifa za hali ya hewa za mfano kulingana na eneo lililotolewa.
- **Zana ya Kunakili Git**: Zana inayonakili hifadhidata ya git hadi folda iliyobainishwa.
- **Zana ya Kufungua VS Code**: Zana inayofungua folda katika VS Code au VS Code Insiders.
- **Unganisha na Agent Builder**: Kipengele kinachokuwezesha kuunganisha server ya MCP na Agent Builder kwa ajili ya majaribio na urekebishaji.
- **Urekebishaji katika [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: Kipengele kinachokuwezesha kurekebisha MCP Server kwa kutumia MCP Inspector.

## Anza na kiolezo cha Weather MCP Server

> **Mahitaji ya awali**
>
> Ili kuendesha MCP Server kwenye mashine yako ya maendeleo ya ndani, utahitaji:
>
> - [Python](https://www.python.org/)
> - [Git](https://git-scm.com/) (Inahitajika kwa zana ya git_clone_repo)
> - [VS Code](https://code.visualstudio.com/) au [VS Code Insiders](https://code.visualstudio.com/insiders/) (Inahitajika kwa zana ya open_in_vscode)
> - (*Hiari - kama unapendelea uv*) [uv](https://github.com/astral-sh/uv)
> - [Ongezeko la Debugger la Python](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Andaa mazingira

Kuna mbinu mbili za kuandaa mazingira kwa mradi huu. Unaweza kuchagua moja kulingana na upendeleo wako.

> Kumbuka: Rudisha VSCode au terminal ili kuhakikisha python wa mazingira halisi (virtual environment) unatumika baada ya kuunda mazingira halisi.

| Mbinu | Hatua |
| -------- | ----- |
| Kutumia `uv` | 1. Unda mazingira halisi: `uv venv` <br>2. Endesha amri ya VSCode "***Python: Select Interpreter***" na chagua python kutoka mazingira halisi yaliyoundwa <br>3. Sakinisha tegemezi (pamoja na tegemezi za maendeleo): `uv pip install -r pyproject.toml --extra dev` |
| Kutumia `pip` | 1. Unda mazingira halisi: `python -m venv .venv` <br>2. Endesha amri ya VSCode "***Python: Select Interpreter***" na chagua python kutoka mazingira halisi yaliyoundwa<br>3. Sakinisha tegemezi (pamoja na tegemezi za maendeleo): `pip install -e .[dev]` | 

Baada ya kuandaa mazingira, unaweza kuendesha server kwenye mashine yako ya maendeleo ya ndani kupitia Agent Builder kama MCP Client kuanza:
1. Fungua paneli ya Debug ya VS Code. Chagua `Debug in Agent Builder` au bonyeza `F5` kuanza kurekebisha MCP server.
2. Tumia AI Toolkit Agent Builder kujaribu server kwa [ombio hili](../../../../../../../../../../../open_prompt_builder). Server itajumuishwa moja kwa moja na Agent Builder.
3. Bonyeza `Run` kujaribu server na ombio.

**Hongera**! Umefanikiwa kuendesha Weather MCP Server kwenye mashine yako ya maendeleo ya ndani kupitia Agent Builder kama MCP Client.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Kile kilichojumuishwa kwenye kiolezo

| Folda / Faili | Maudhui                                    |
| ------------ | ------------------------------------------ |
| `.vscode`    | Faili za VSCode kwa urekebishaji           |
| `.aitk`      | Mipangilio ya AI Toolkit                    |
| `src`        | Chanzo cha msimbo wa weather mcp server    |

## Jinsi ya kurekebisha Weather MCP Server

> Vidokezo:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) ni zana ya kuona kwa msanidi programu kwa ajili ya majaribio na urekebishaji wa MCP servers.
> - Modes zote za urekebishaji zinasaidia breakpoints, hivyo unaweza kuongeza breakpoints kwenye msimbo wa utekelezaji wa zana.

## Zana Zinazopatikana

### Zana ya Hali ya Hewa
`get_weather` ni zana inayotoa taarifa za hali ya hewa kama mfano kwa eneo lililotajwa.

| Kigezo | Aina | Maelezo |
| --------- | ---- | ----------- |
| `location` | string | Eneo la kupata hali ya hewa (km, jina la mji, jimbo, au sehemu za kuratibu) |

### Zana ya Kunakili Git
`git_clone_repo` ni zana inayonakili hifadhidata ya git hadi folda iliyobainishwa.

| Kigezo | Aina | Maelezo |
| --------- | ---- | ----------- |
| `repo_url` | string | URL ya hifadhidata ya git inayotakiwa kunakiliwa |
| `target_folder` | string | Njia ya folda ambapo hifadhidata inakiliwa |

Zana hurejesha kitu cha JSON chenye:
- `success`: Boolean inaonyesha kama operesheni ilikuwa na mafanikio
- `target_folder` au `error`: Njia ya folda ya hifadhidata iliyonakiliwa au ujumbe wa kosa

### Zana ya Kufungua VS Code
`open_in_vscode` ni zana inayofungua folda katika programu ya VS Code au VS Code Insiders.

| Kigezo | Aina | Maelezo |
| --------- | ---- | ----------- |
| `folder_path` | string | Njia ya folda kufunguliwa |
| `use_insiders` | boolean (hiari) | Ikiwa utatumia VS Code Insiders badala ya VS Code ya kawaida |

Zana hurejesha kitu cha JSON chenye:
- `success`: Boolean inaonyesha kama operesheni ilikuwa na mafanikio
- `message` au `error`: Ujumbe wa kuthibitisha au ujumbe wa kosa

| Mode ya Urekebishaji | Maelezo | Hatua za kurekebisha |
| ---------- | ----------- | --------------- |
| Agent Builder | Rekebisha MCP server katika Agent Builder kupitia AI Toolkit. | 1. Fungua paneli ya Debug ya VS Code. Chagua `Debug in Agent Builder` na bonyeza `F5` kuanza urekebishaji wa MCP server.<br>2. Tumia AI Toolkit Agent Builder kujaribu server na [ombio hili](../../../../../../../../../../../open_prompt_builder). Server itajumuishwa moja kwa moja na Agent Builder.<br>3. Bonyeza `Run` kujaribu server na ombio. |
| MCP Inspector | Rekebisha MCP server kwa kutumia MCP Inspector. | 1. Sakinisha [Node.js](https://nodejs.org/)<br> 2. Andaa Inspector: `cd inspector` && `npm install` <br> 3. Fungua paneli ya Debug ya VS Code. Chagua `Debug SSE in Inspector (Edge)` au `Debug SSE in Inspector (Chrome)`. Bonyeza F5 kuanza urekebishaji.<br> 4. Uzinduzi MCP Inspector katika kivinjari, bonyeza kitufe cha `Connect` kuunganisha MCP server hii.<br> 5. Kisha unaweza `List Tools`, chagua zana, ingiza vigezo, na `Run Tool` kurekebisha msimbo wako wa server.<br> |

## Bandari za kimsingi na mabadiliko

| Mode ya Urekebishaji | Bandari | Maelezo | Mabadiliko | Kumbuka |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | Hariri [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) kubadilisha bandari hizi. | Haipo |
| MCP Inspector | 3001 (Server); 5173 na 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | Hariri [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) kubadilisha bandari hizi.| Haipo |

## Maoni

Ikiwa una maoni au mapendekezo kwa kiolezo hiki, tafadhali fungua tatizo kwenye [AI Toolkit GitHub repository](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tangazo la Kutojihusisha**:
Nyaraka hii imetafsiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kwa usahihi, tafadhali fahamu kuwa tafsiri za kiotomatiki zinaweza kuwa na makosa au kasoro. Nyaraka ya awali katika lugha yake ya asili inapaswa kuzingatiwa kama chanzo cha mamlaka. Kwa taarifa muhimu, tafsiri ya kitaalamu inayofanywa na binadamu inashauriwa. Hatubebwi責 kwa maelewano mabaya au uelewa wa makosa unaotokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->