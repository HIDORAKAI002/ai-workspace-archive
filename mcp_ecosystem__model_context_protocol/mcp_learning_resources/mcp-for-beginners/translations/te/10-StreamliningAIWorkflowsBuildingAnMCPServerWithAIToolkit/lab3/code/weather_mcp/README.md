# వాతావరణ MCP సర్వర్

ఈ పైనేక్షన్‌లో వేసిన పాఠం కొరకు వాతావరణ సాధనాలతో మాక్ స్పందనలు అమలు చేసే Python లో నమూనా MCP సర్వర్ ఇది. ఇది మీ స్వంత MCP సర్వర్ కోసం ఒక మూర్ఖదళమైన రూపకల్పనగా ఉపయోగించవచ్చు. దీనిలో క్రింది ఫీచర్లు ఉన్నాయి:

- **వాతావరణ సాధనం**: ఇచ్చిన ప్రాంతం ఆధారంగా మాక్ వాతావరణ సమాచారాన్ని అందించే సాధనం.
- **ఏజెంట్ బిల్డర్‌కు కనెక్ట్ కావడం**: పరీక్షించడం మరియు డిబగ్గింగ్ కోసం MCP సర్వర్‌ను ఏజెంట్ బిల్డర్‌కి కనెక్ట్ చేసుకోవడాన్ని అనుమతించే ఫీచర్.
- **[MCP ఇన్స్పెక్టర్](https://github.com/modelcontextprotocol/inspector) లో డిబగ్గింగ్**: MCP సర్వర్‌ను MCP ఇన్స్పెక్టర్ ఉపయోగించి డిబగ్గ్ చేయడానికి అనుమతించే ఫీచర్.

## వాతావరణ MCP సర్వర్ టెంప్లేట్‌తో ప్రారంభం

> **అవసరాలు**
>
> మీ స్థానిక డెవలప్‌మెంట్ యంత్రంలో MCP సర్వర్ ను నడపాలంటే, మీరు అవసరమవుతుంది:
>
> - [Python](https://www.python.org/)
> - (*ఐచ్చికం - మీరు uv ని ఇష్టపడితే*) [uv](https://github.com/astral-sh/uv)
> - [Python డీబగ్గర్ ఎక్స్‌టెన్షన్](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## వాతావరణం సిద్ధం చేయండి

ఈ ప్రాజెక్ట్ కోసం వాతావరణాన్ని ఏర్పాటు చేసుకోవడానికి రెండు పద్ధతులు ఉన్నాయి. మీ ఇష్టాన్ని బట్టి ఏదైనా ఒక దాన్ని ఎన్నుకోండి.

> గమనించండి: వర్చువల్ ఎన్విరాన్‌మెంట్ సృష్టించిన తర్వాత వర్చువల్ ఎన్విరాన్‌మెంట్ పైథాన్ ఉపయోగించాలని నిర్ధారించేందుకు VSCode లేదా టెర్మినల్‌ను రీలోడ్ చేయండి.

| పద్ధతి | దశలు |
| -------- | ----- |
| `uv` ఉపయోగించడం | 1. వర్చువల్ ఎన్విరాన్‌మెంట్ సృష్టించండి: `uv venv` <br>2. VSCode కమాండ్ "***Python: Select Interpreter***" ను నడిపి, సృష్టించిన వర్చువల్ ఎన్విరాన్‌మెంట్ నుండి ప/python/ని ఎంచుకోండి<br>3. డిపెండెన్సీలు (డెవ్ డిపెండెన్సీలు సహా) ఇన్‌స్టాల్ చేయండి: `uv pip install -r pyproject.toml --extra dev` |
| `pip` ఉపయోగించడం | 1. వర్చువల్ ఎన్విరాన్‌మెంట్ సృష్టించండి: `python -m venv .venv` <br>2. VSCode కమాండ్ "***Python: Select Interpreter***" ను నడిపి, సృష్టించిన వర్చువల్ ఎన్విరాన్‌మెంట్ నుండి ప/python/ని ఎంచుకోండి<br>3. డిపెండెన్సీలు (డెవ్ డిపెండెన్సీలు సహా) ఇన్‌స్టాల్ చేయండి: `pip install -e .[dev]` |

వాతావరణాన్ని ఏర్పాటు చేసిన తరువాత, మీరు Agent Builder ద్వారా MCP క్లయింట్‌గా స్థానిక డెవలప్‌మెంట్ యంత్రంలో సర్వర్‌ను రన్ చేసి ప్రారంభించవచ్చు:
1. VS Code డీబగ్ ప్యానెల్‌ను తెరవండి. `Debug in Agent Builder`ని ఎంచుకొని లేదా `F5` నొక్కి MCP సర్వర్‌ను డీబగ్ చేయడం ప్రారంభించండి.
2. Microsoft Foundry Toolkit Agent Builder ఉపయోగించి [ఈ ప్రాంప్ట్](../../../../../../../../../../../open_prompt_builder) తో సర్వర్‌ను పరీక్షించండి. సర్వర్ ఏజెంట్ బిల్డర్‌కు ఆటోగా కనెక్ట్ అవుతుంది.
3. సర్వర్‌ను ప్రాంప్ట్‌తో పరీక్షించడానికి `Run` ను క్లిక్ చేయండి.

**అభినందనలు**! మీరు Agent Builder ద్వారా MCP క్లయింట్‌గా మీ స్థానిక డెవలప్‌మెంట్ యంత్రంలో వాతావరణ MCP సర్వర్‌ను విజయవంతంగా నడిపారు.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## టెంప్లేట్‌లో ఏమి ఉంది

| ఫోల్డర్ / ఫైల్| ഉള്ളటువంటి అంశాలు                                      |
| -------------- | ------------------------------------------------------ |
| `.vscode`      | డీబగ్గింగ్ కోసం VSCode ఫైళ్లు                          |
| `.aitk`        | Microsoft Foundry Toolkit కోసం కంఫిగరేషన్లు            |
| `src`          | వాతావరణ MCP సర్వర్ కోసం సోర్స్ కోడ్                    |

## వాతావరణ MCP సర్వర్‌ను ఎలా డీబగ్ చేయాలి

> గమనికలు:
> - [MCP ఇన్స్పెక్టర్](https://github.com/modelcontextprotocol/inspector) MCP సర్వర్‌లను పరీక్షించడానికి మరియు డీబగ్ చేయడానికి విజువల్ డెవలపర్ టూల్.
> - అన్ని డీబగ్గింగ్ మోడ్‌లు బ్రేక్‌పాయింట్లు మద్దతు ఇస్తాయి, కాబట్టి మీరు టూల్ అమలు కోడ్‌లో బ్రేక్‌పాయింట్లు వేసుకోవచ్చు.

| డీబగ్ మోడ్ | వివరణ | డీబగ్ చేయడానికి దశలు |
| ------------ | ------- | -------------------- |
| ఏజెంట్ బిల్డర్ | Microsoft Foundry Toolkit ద్వారా ఏజెంట్ బిల్డర్‌లో MCP సర్వర్‌ను డీబగ్ చేయడం. | 1. VS Code డీబగ్ ప్యానెల్‌ను తెరవండి. `Debug in Agent Builder` ఎంచుకుని `F5` నొక్కి MCP సర్వర్‌ను డీబగ్ చేయడం ప్రారంభించండి.<br>2. Microsoft Foundry Toolkit Agent Builder ఉపయోగించి [ఈ ప్రాంప్ట్](../../../../../../../../../../../open_prompt_builder) తో సర్వర్‌ను పరీక్షించండి. సర్వర్ ఆటో కనెక్ట్ అవుతుంది.<br>3. ప్రాంప్ట్‌తో సర్వర్‌ను పరీక్షించడానికి `Run` క్లిక్ చేయండి. |
| MCP ఇన్స్పెక్టర్ | MCP ఇన్స్పెక్టర్ ఉపయోగించి MCP సర్వర్‌ను డీబగ్ చేయడం. | 1. [Node.js](https://nodejs.org/) ఇన్‌స్టాల్ చేయండి<br> 2. ఇన్స్పెక్టర్‌ను సెట్ చేసుకోండి: `cd inspector` && `npm install` <br> 3. VS Code డీబగ్ ప్యానెల్‌ని తెరవండి. `Debug SSE in Inspector (Edge)` లేదా `Debug SSE in Inspector (Chrome)` ఎంచుకోండి. `F5` నొక్కి డీబగ్గింగ్ మొదలు పెట్టండి.<br> 4. MCP ఇన్స్పెక్టర్ బ్రౌజర్లో ప్రారంభమైనప్పుడు, `Connect` బటన్‌ను నొక్కి ఈ MCP సర్వర్‌కు కనెక్ట్ అవ్వండి.<br> 5. తరువాత మీరు `List Tools` ను నొక్కి టూల్ ఎంచుకుని, పారామితులు ఇన్‌పుట్ చేసి, `Run Tool` ద్వారా సర్వర్ కోడ్‌ను డీబగ్ చేయవచ్చు.<br> |

## డిఫాల్ట్ పోర్టులు మరియు అనుకూలీకరణలు

| డీబగ్ మోడ్ | పోర్టులు | నిర్వచనలు | అనుకూలీకరణలు | గమనిక |
| ------------ | ----- | --------- | -------------- | ------- |
| ఏజెంట్ బిల్డర్ | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | పై పోర్టులను మార్చడానికి [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) ఎడిట్ చేయండి. | ఉచితం |
| MCP ఇన్స్పెక్టర్ | 3001 (సర్వర్); 5173 మరియు 3000 (ఇన్స్పెక్టర్) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | పై పోర్టులను మార్చడానికి [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) ఎడిట్ చేయండి. | ఉచితం |

## అభిప్రాయాలు

మీకు ఈ టెంప్లేట్ గురించి ఏవైనా అభిప్రాయాలు లేదా సూచనలు ఉంటే, దయచేసి [Microsoft Foundry Toolkit GitHub repository](https://github.com/microsoft/vscode-ai-toolkit/issues) లో ఒక ఇష్యూ ఓపెన్ చేయండి.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**అస్వీకరణ**:
ఈ పత్రం AI అనువాద సేవ [Co-op Translator](https://github.com/Azure/co-op-translator) ఉపయోగించి అనువదించబడింది. మేము ఖచ్చితత్వానికి ప్రయత్నిస్తున్నప్పటికీ, ఆటోమేటెడ్ అనువాదాలు తప్పులు లేదా అసమగ్రతలను కలిగి ఉండవచ్చు. దాని స్వదేశ భాషలో ఉన్న అసలు పత్రాన్ని అధికారం కలిగిన మూలంగా పరిగణించాలి. కీలకమైన సమాచారం కోసం, ప్రొఫెషనల్ మానవ అనువాదాన్ని సిఫారసు చేస్తాము. ఈ అనువాదం ఉపయోగం వల్ల కలిగే ఏవైనా అపార్థాలు లేదా తప్పుదారులు కోసం మేము బాధ్యత వహించము.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->