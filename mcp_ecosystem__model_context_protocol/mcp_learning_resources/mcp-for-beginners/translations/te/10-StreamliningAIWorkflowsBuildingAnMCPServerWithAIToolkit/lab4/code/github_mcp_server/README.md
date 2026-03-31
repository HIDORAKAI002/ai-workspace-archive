# వాతావరణ MCP సర్వర్

ఇది మాక్ స్పందనలతో వాతావరణ సాధనాలను అమలు చేస్తున్న Python లోని ఒక నమూనా MCP సర్వర్. మీరు మీ స్వంత MCP సర్వర్ కోసం స్కాఫోల్డ్‌గా ఉపయోగించుకోవచ్చు. దీనిలో క్రింది లక్షణాలు ఉన్నాయి:

- **వాతావరణ సాధనం**: ఇచ్చిన స్థలంపై ఆధారపడి మాక్ చేయబడిన వాతావరణ సమాచారాన్ని అందించే సాధనం.
- **Git క్లోన్ సాధనం**: గిట్లను నిర్దిష్ట ఫోల్డర్‌కు క్లోన్ చేసే సాధనం.
- **VS కోడ్ ఓపెన్ సాధనం**: ఫోల్డర్‌ను VS కోడ్ లేదా VS కోడ్ ఇన్‌సైడర్స్‌లో తెరవడానికి సాధనం.
- **ఏజెంట్ బిల్డర్‌కు కనెక్ట్ చేయండి**: MCP సర్వర్‌ను పరీక్షించడం మరియు డీబగ్గింగ్ కోసం ఏజెంట్ బిల్డర్‌కు కనెక్ట్ చేసే సౌకర్యం.
- **[MCP ఇన్స్‌పెక్టర్](https://github.com/modelcontextprotocol/inspector)లో డీబగ్ చేయండి**: MCP సర్వర్‌ను MCP ఇన్స్‌పెక్టర్ ఉపయోగించి డీబగ్ చేయడానికి ఫీచర్.

## వాతావరణ MCP సర్వర్ టెంప్లేట్‌తో ప్రారంభించండి

> **ముందస్తు అవసరాలు**
>
> మీ స్థానిక డెవలప్‌మెంట్ యంత్రంలో MCP సర్వర్ నడపడానికి, మీరు అవసరం:
>
> - [Python](https://www.python.org/)
> - [Git](https://git-scm.com/) (git_clone_repo సాధనానికి అవసరం)
> - [VS కోడ్](https://code.visualstudio.com/) లేదా [VS కోడ్ ఇన్‌సైడర్స్](https://code.visualstudio.com/insiders/) (open_in_vscode సాధనానికి అవసరం)
> - (*ఐచ్చికం - మీరు uv ను ఇష్టపడితే*) [uv](https://github.com/astral-sh/uv)
> - [Python డీబగ్గర్ ఎక్స్‌టెన్షన్](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## వాతావరణం సిద్ధం చేయండి

ఈ ప్రాజెక్ట్ కోసం వాతావరణాన్ని సెట్ చేయడానికి రెండు మార్గాలు ఉన్నాయి. మీ ఇష్టానుసారం ఏదైనా ఎంచుకోవచ్చు.

> గమనిక: వర్చువల్ వాతావరణం సృష్టించిన తర్వాత, వర్చువల్ వాతావరణ python ఉపయోగించబడుతున్నదని నిర్ధారించుకోవడానికి VSCode లేదా టెర్మినల్‌ను రీలోడ్ చేయండి.

| పద్ధతి | దశలు |
| -------- | ----- |
| `uv` ఉపయోగించడం | 1. వర్చువల్ వాతావరణం సృష్టించండి: `uv venv` <br>2. VSCode క‌మాండ్ "***Python: Select Interpreter***" ని పరుగెడండి మరియు సృష్టించిన వర్చువల్ వాతావరణంలోని python ని ఎంచుకోండి<br>3. ఆధారపడి ఉన్న డిపెండెన్సీలు (డెవ్ డిపెండెన్సీలతో సహా) ఇన్స్టాల్ చేయండి: `uv pip install -r pyproject.toml --extra dev` |
| `pip` ఉపయోగించడం | 1. వర్చువల్ వాతావరణం సృష్టించండి: `python -m venv .venv` <br>2. VSCode క‌మాండ్ "***Python: Select Interpreter***" ని పరుగెడండి మరియు సృష్టించిన వర్చువల్ వాతావరణంలోని python ని ఎంచుకోండి<br>3. ఆధారపడి ఉన్న డిపెండెన్సీలు (డెవ్ డిపెండెన్సీలతో సహా) ఇన్స్టాల్ చేయండి: `pip install -e .[dev]` | 

వాతావరణం సెట్ చేసిన తర్వాత, మీరు Agent Builder ద్వారా MCP క్లయింట్‌గా స్థానిక డెవలప్‌మెంట్ యంత్రంలో సర్వర్ నడపవచ్చు:
1. VS కోడ్ డీబగ్ ప్యానెల్ తెరవండి. `Debug in Agent Builder` ఎంచుకుని లేదా `F5` నొక్కి MCP సర్వర్‌ను డీబగ్గింగ్ ప్రారంభించండి.
2. AI Toolkit Agent Builder ఉపయోగించి [ఈ ప్రాంప్ట్](../../../../../../../../../../../open_prompt_builder) తో సర్వర్‌ను పరీక్షించండి. సర్వర్ ఆటోమేటిగ్గా Agent Builder కి కనెక్ట్ అవుతుంది.
3. ప్రాంప్ట్‌తో సర్వర్‌ను పరీక్షించడానికి `Run` బటన్‌ను క్లిక్ చేయండి.

**అభినందనలు**! మీరు Agent Builder ద్వారా MCP క్లయింట్‌గా స్థానిక డెవలప్‌మెంట్ యంత్రంలో విజయవంతంగా వాతావరణ MCP సర్వర్ నడపలేక ఉన్నారు.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## టెంప్లేట్‌లో ఏమి ఉంది

| ఫోల్డర్ / ఫైల్| కంటెంట్‌లు                                    |
| ------------ | -------------------------------------------- |
| `.vscode`    | డీబగ్గింగ్ కోసం VSCode ఫైల్‌లు                 |
| `.aitk`      | AI Toolkit కు కాన్ఫిగరేషన్లు                   |
| `src`        | వాతావరణ mcp సర్వర్ యొక్క సోర్స్ కోడ్             |

## వాతావరణ MCP సర్వర్‌ను ఎలా డీబగ్ చేయాలి

> గమనికలు:
> - [MCP ఇన్స్‌పెక్టర్](https://github.com/modelcontextprotocol/inspector) MCP సర్వర్‌లను పరీక్షించడం మరియు డీబగ్గింగ్ కోసం ఒక విజువల్ డెవలపర్ సాధనం.
> - అన్ని డీబగ్గింగ్ మోడ్‌లు బ్రేక్‌పాయింట్లను మద్దతు ఇస్తాయి, కాబట్టి మీరు సాధనం అమలు కోడ్‌లో బ్రేక్‌పాయింట్లు జోడించవచ్చు.

## అందుబాటులో ఉన్న సాధనాలు

### వాతావరణ సాధనం
`get_weather` సాధనం ఇచ్చిన స్థానానికి సంబంధించిన మాక్ వాతావరణ సమాచారాన్ని అందిస్తుంది.

| పారా మీటర్ | రకం | వివరణ |
| --------- | ---- | ----------- |
| `location` | string | వాతావరణాన్ని పొందడానికి స్థలం (ఉదాహరణకు, నగరం పేరు, రాష్ట్రం లేదా సమన్వయాలు) |

### Git క్లోన్ సాధనం
`git_clone_repo` సాధనం గిట్ రిపాజిటరీని ఒక సూచించిన ఫోల్డర్‌కు క్లోన్ చేస్తుంది.

| పారా మీటర్ | రకం | వివరణ |
| --------- | ---- | ----------- |
| `repo_url` | string | క్లోన్ చేయాల్సిన గిట్ రిపాజిటరీ యొక్క URL |
| `target_folder` | string | రిపాజిటరీని క్లోన్ చేయాల్సిన ఫోల్డర్ మార్గం |

సాధనం JSON ఆబ్జెక్ట్‌ను హానిచేస్తుంది:
- `success`: ఆపరేషన్ విజయవంతమైందని సూచించే బూలియన్
- `target_folder` లేదా `error`: క్లోన్ చేయబడిన రిపాజిటరీ మార్గం లేదా ఎర్రర్ సందేశం

### VS కోడ్ ఓపెన్ సాధనం
`open_in_vscode` సాధనం ఒక ఫోల్డర్‌ను VS కోడ్ లేదా VS కోడ్ ఇన్‌సైడర్స్ అప్లికేషన్‌లో తెరుస్తుంది.

| పారా మీటర్ | రకం | వివరణ |
| --------- | ---- | ----------- |
| `folder_path` | string | తెరవాల్సిన ఫోల్డర్ మార్గం |
| `use_insiders` | boolean (ఐచ్చికం) | సాధారణ VS కోడ్ బదులు VS కోడ్ ఇన్‌సైడర్స్ ఉపయోగించాలా అనే సూచిక |

సాధనం JSON ఆబ్జెక్ట్‌ను హానిచేస్తుంది:
- `success`: ఆపరేషన్ విజయవంతమైందని సూచించే బూలియన్
- `message` లేదా `error`: ధ్రువీకరణ సందేశం లేదా ఎర్రర్ సందేశం

| డీబగ్ మోడ్ | వివరణ | డీబగ్ చేయడానికి దశలు |
| ---------- | ----------- | --------------- |
| ఏజెంట్ బిల్డర్ | AI Toolkit ద్వారా MCP సర్వర్‌ను ఏజెంట్ బిల్డర్‌లో డీబగ్ చేయండి. | 1. VS కోడ్ డీబగ్ ప్యానెల్ తెరవండి. `Debug in Agent Builder` ఎంచుకుని `F5` నొక్కి MCP సర్వర్ డీబగ్గింగ్ ప్రారంభించండి.<br>2. AI Toolkit Agent Builder తో [ఈ ప్రాంప్ట్](../../../../../../../../../../../open_prompt_builder) తో సర్వర్‌ను పరీక్షించండి. సర్వర్ ఆటోమేటిగ్గా ఏజెంట్ బిల్డర్‌కు కనెక్ట్ అవుతుంది.<br>3. ప్రాంప్ట్‌తో సర్వర్‌ను పరీక్షించడానికి `Run` క్లిక్ చేయండి. |
| MCP ఇన్స్‌పెక్టర్ | MCP ఇన్స్‌పెక్టర్ ఉపయోగించి MCP సర్వర్‌ను డీబగ్ చేయండి. | 1. [Node.js](https://nodejs.org/) ఇన్‌స్టాల్ చేయండి<br> 2. ఇన్స్‌పెక్టర్ సెటప్ చేయండి: `cd inspector` && `npm install` <br> 3. VS కోడ్ డీబగ్ ప్యానెల్ తెరవండి. `Debug SSE in Inspector (Edge)` లేదా `Debug SSE in Inspector (Chrome)` ఎంచుకోండి. F5 నొక్కి డీబగ్గింగ్ ప్రారంభించండి.<br> 4. MCP ఇన్స్‌పెక్టర్ బ్రౌజర్‌లో ప్రారంభమైనప్పుడు, ఈ MCP సర్వర్‌కు కనెక్ట్ కావడానికి `Connect` బటన్‌ను క్లిక్ చేయండి.<br> 5. తరువాత మీరు `List Tools` చేయొచ్చు, ఒక సాధనం ఎంచుకోండి, పారా మీటర్లు ఇన్పుట్ చేయండి, మరియు మీ సర్వర్ కోడ్‌ను డీబగ్ చేయడానికి `Run Tool` చేయండి.<br> |

## డిఫాల్ట్ పోర్టులు మరియు అనుకూలీకరణలు

| డీబగ్ మోడ్ | పోర్టులు | నిర్వచనాలు | అనుకూలీకరణలు | గమనిక |
| ---------- | ----- | ------------ | -------------- |-------------- |
| ఏజెంట్ బిల్డర్ | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | ఈ పోర్టులను మార్చడానికి [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) సవరించండి. | N/A |
| MCP ఇన్స్‌పెక్టర్ | 3001 (సర్వర్); 5173 మరియు 3000 (ఇన్స్‌పెక్టర్) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | ఈ పోర్టులను మార్చడానికి [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) సవరించండి.| N/A |

## అభిప్రాయం

మీకు ఈ టెంప్లేట్ గురించిన ఏవైనా అభిప్రాయాలు లేదా సలహాలు ఉంటే, దయచేసి [AI Toolkit GitHub రిపాజిటరీ](https://github.com/microsoft/vscode-ai-toolkit/issues)లో ఒక ఇష్యూ తెరవండి.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**వ్యాఖ్య**:
ఈ పత్రాన్ని AI అనువాద సేవ [Co-op Translator](https://github.com/Azure/co-op-translator) ఉపయోగించి అనువదించబడింది. సరైనత కొరకు మేము కృషి చేస్తుండగా, ఆటోమేటెడ్ అనువాదాలలో పొరపాట్లు లేదా తప్పిదాలు ఉండవచ్చని దయచేసి గమనించండి. ప్రాథమిక భాషలో ఉన్న మౌలిక పత్రం ప్రామాణిక మూలంగా పరిగణించబడాలి. ముఖ్యమైన సమాచారానికి, వృత్తిపరమైన మానవ అనువాదం సిఫార్సు చేయబడుతుంది. ఈ అనువాదం వాడకం కారణంగా ఏర్పడే ఏ వివరణా తప్పుడు అర్థం లేదా తప్పుదెగ్గు కారణంగా మేము బాధ్యురాలు కుదరకు.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->