# Weather MCP Server

Hii ni mfano wa MCP Server katika Python inatekeleza zana za hali ya hewa kwa majibu ya kigezo. Inaweza kutumika kama fremu kwa MCP Server yako mwenyewe. Inajumuisha sifa zifuatazo: 

- **Chombo cha Hali ya Hewa**: Chombo kinachotoa taarifa za hali ya hewa zilizopigwa mfano kulingana na eneo lililotolewa.
- **Unganisha na Agent Builder**: Sifa inayokuwezesha kuunganisha seva ya MCP na Agent Builder kwa ajili ya upimaji na utatuzi.
- **Tatua matatizo katika [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: Sifa inayokuwezesha kutatua matatizo ya MCP Server kwa kutumia MCP Inspector.

## Anza na templeti ya Weather MCP Server

> **Masharti ya awali**
>
> Ili kuendesha MCP Server kwenye mashine yako ya maendeleo ya ndani, utahitaji:
>
> - [Python](https://www.python.org/)
> - (*Hiari - ikiwa unapendelea uv*) [uv](https://github.com/astral-sh/uv)
> - [Nyongeza ya Kiongeza Kasoro ya Python](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Andaa mazingira

Kuna njia mbili za kuandaa mazingira kwa mradi huu. Unaweza kuchagua moja kulingana na upendeleo wako.

> Kumbuka: Rudi kuanzisha upya VSCode au terminal ili kuhakikisha python wa mazingira pepe unatumika baada ya kuunda mazingira pepe.

| Njia | Hatua |
| -------- | ----- |
| Kutumia `uv` | 1. Unda mazingira pepe: `uv venv` <br>2. Endesha Amri ya VSCode "***Python: Select Interpreter***" na chagua python kutoka mazingira pepe yaliyoundwa <br>3. Sakinisha utegemezi (ikiwa ni pamoja na utegemezi wa maendeleo): `uv pip install -r pyproject.toml --extra dev` |
| Kutumia `pip` | 1. Unda mazingira pepe: `python -m venv .venv` <br>2. Endesha Amri ya VSCode "***Python: Select Interpreter***" na chagua python kutoka mazingira pepe yaliyoundwa<br>3. Sakinisha utegemezi (ikiwa ni pamoja na utegemezi wa maendeleo): `pip install -e .[dev]` | 

Baada ya kuandaa mazingira, unaweza kuendesha seva katika mashine yako ya maendeleo ya ndani kupitia Agent Builder kama Mteja wa MCP kuanzia:
1. Fungua jopo la Kusuluhisha Kasoro la VS Code. Chagua `Debug in Agent Builder` au bonyeza `F5` kuanza kusuluhisha kasoro seva ya MCP.
2. Tumia Microsoft Foundry Toolkit Agent Builder kupima seva kwa [amri hii](../../../../../../../../../../../open_prompt_builder). Seva itakuwa imeunganishwa moja kwa moja na Agent Builder.
3. Bonyeza `Run` kujaribu seva kwa amri hiyo.

**Hongera**! Umefanikiwa kuendesha Weather MCP Server katika mashine yako ya maendeleo ya ndani kupitia Agent Builder kama Mteja wa MCP.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Kinachojumuishwa katika templeti

| Folda / Faili | Yaliyomo                                       |
| ------------- | --------------------------------------------- |
| `.vscode`     | Faili za VSCode kwa kusuluhisha kasoro         |
| `.aitk`       | Mipangilio ya Microsoft Foundry Toolkit       |
| `src`         | Chanzo cha msimbo wa seva ya mcp ya hali ya hewa |

## Jinsi ya kusuluhisha kasoro Weather MCP Server

> Vidokezo:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) ni zana ya kuona ya mtengenezaji kwa ajili ya kupima na kusuluhisha kasoro seva za MCP.
> - Njia zote za utatuzi zinaunga mkono alama za kusimamisha msimbo, hivyo unaweza kuongeza alama za kusimamisha msimbo kwenye utekelezaji wa chombo.

| Njia ya Utatuzi | Maelezo | Hatua za kutatua kasoro |
| --------------- | -------- | ----------------------- |
| Agent Builder | Tatua kasoro seva ya MCP ndani ya Agent Builder kupitia Microsoft Foundry Toolkit. | 1. Fungua jopo la Kusuluhisha Kasoro la VS Code. Chagua `Debug in Agent Builder` na bonyeza `F5` kuanza kutatua kasoro seva ya MCP.<br>2. Tumia Microsoft Foundry Toolkit Agent Builder kupima seva kwa [amri hii](../../../../../../../../../../../open_prompt_builder). Seva itakuwa imeunganishwa moja kwa moja na Agent Builder.<br>3. Bonyeza `Run` kujaribu seva kwa amri hiyo. |
| MCP Inspector | Tatua kasoro seva ya MCP kwa kutumia MCP Inspector. | 1. Sakinisha [Node.js](https://nodejs.org/)<br> 2. Andaa Inspector: `cd inspector` && `npm install` <br> 3. Fungua jopo la Kusuluhisha Kasoro la VS Code. Chagua `Debug SSE in Inspector (Edge)` au `Debug SSE in Inspector (Chrome)`. Bonyeza `F5` kuanza kutatua kasoro.<br> 4. Wakati MCP Inspector inapoanzishwa katika kivinjari, bonyeza kitufe cha `Connect` kuunganisha seva hii ya MCP.<br> 5. Kisha unaweza `List Tools`, chagua chombo, ingiza vigezo, na `Run Tool` kutatua kasoro msimbo wa seva yako.<br> |

## Bandari za asili na mabadiliko maalum

| Njia ya Utatuzi | Bandari | Maelezo | Mabadiliko | Kumbuka |
| --------------- | ------- | -------- | ---------- | -------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Hariri [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) kubadilisha bandari hapo juu. | Haina |
| MCP Inspector | 3001 (Seva); 5173 na 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Hariri [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) kubadilisha bandari hapo juu.| Haina |

## Maoni

Ikiwa una maoni au mapendekezo kwa templeti hii, tafadhali fungua tatizo katika [hifadhidata ya Microsoft Foundry Toolkit GitHub](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Kionyozo**:
Hati hii imetafsiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kupata usahihi, tafadhali fahamu kwamba tafsiri za kiotomatiki zinaweza kuwa na makosa au upungufu wa usahihi. Hati ya asili katika lugha yake halisi inapaswa kuchukuliwa kama chanzo cha mamlaka. Kwa taarifa muhimu, tafsiri ya kitaalamu inayofanywa na binadamu inapendekezwa. Hatutojibu kwa kuelewa vibaya au tafsiri potofu zinazotokea kutokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->