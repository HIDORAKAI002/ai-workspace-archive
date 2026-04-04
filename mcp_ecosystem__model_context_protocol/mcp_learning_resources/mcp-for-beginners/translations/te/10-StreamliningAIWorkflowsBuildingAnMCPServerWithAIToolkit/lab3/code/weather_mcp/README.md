# వాతావరణ MCP సర్వర్

ఇది Pythonలో వాతావరణ పరికరాలను మాక్ స్పందనలతో అమలు చేసే నమూనా MCP సర్వర్. మీరు మీ స్వంత MCP సర్వర్ కోసం దీన్ని ఒక మౌళికంగా ఉపయోగించవచ్చు. దీని లో క్రింది ఫీచర్లు ఉన్నాయి:

- **వాతావరణ పరికరం**: ఇచ్చిన ప్రాంతంపై ఆధారపడి మాక్ చేసిన వాతావరణ సమాచారాన్ని అందించే పరికరం.
- **ఏజెంట్ బిల్డర్‌కు కనెక్ట్ అవ్వడం**: పరీక్షించడం మరియు బగ్‌లను సరిదిద్దటానికి MCP సర్వర్‌ను ఏజెంట్ బిల్డర్‌కు కనెక్ట్ చేయడానికి వీలుగా చేయొచ్చిన ఫీచర్.
- **[MCP ఇన్స్పెక్టర్](https://github.com/modelcontextprotocol/inspector) లో డీబగ్గింగ్**: MCP ఇన్స్పెక్టర్ ఉపయోగించి MCP సర్వర్‌ను డీబగ్ చేయడానికి ఆ ఫీచర్.

## వాతావరణ MCP సర్వర్ టెంప్లేట్‌తో ప్రారంభించండి

> **ముందస్తు అవసరాలు**
>
> మీ స్థానిక అభివృద్ధి యంత్రంలో MCP సర్వర్ నడిపించడానికి, మీరు అవసరమైనవి:
>
> - [Python](https://www.python.org/)
> - (*ఐచ్ఛికం - మీరు uv ఇష్టపడితే*) [uv](https://github.com/astral-sh/uv)
> - [Python డీబగ్గర్ ఎక్స్‌టెన్షన్](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## వాతావరణాన్ని సిద్ధం చేయండి

ఈ ప్రాజెక్ట్‌కు వాతావరణం ఏర్పాటు చేయడానికి రెండు విధానాలు ఉన్నాయి. మీ ఇష్టానికి అనుగుణంగా ఎవరైనా ఒకట్నే ఎంచుకోవచ్చు.

> గమనిక: వర్చువల్ ఎన్‌విరాన్‌మెంట్ సృష్టించిన తర్వాత వర్చువల్ ఎన్‌విరాన్‌మెంట్ python ఉపయోగించబడుతున్నదని నిర్ధారించడానికి VSCode లేదా టెర్మినల్‌ను రీ లోడ్ చేయండి.

| విధానం | దశలు |
| -------- | ----- |
| `uv` ఉపయోగించడం | 1. వర్చువల్ ఎన్‌విరాన్‌మెంట్ సృష్టించండి: `uv venv` <br>2. VSCode కమాండ్ "***Python: Select Interpreter***" నడపండి మరియు సృష్టించిన వర్చువల్ ఎన్‌విరాన్‌మెంట్ నుండి python ఎంచుకోండి <br>3. డిపెండెన్సీలు (డెవ్ డిపెండెన్సీలు సహా) ఇన్స్టాల్ చేయండి: `uv pip install -r pyproject.toml --extra dev` |
| `pip` ఉపయోగించడం | 1. వర్చువల్ ఎన్‌విరాన్‌మెంట్ సృష్టించండి: `python -m venv .venv` <br>2. VSCode కమాండ్ "***Python: Select Interpreter***" నడపండి మరియు సృష్టించిన వర్చువల్ ఎన్‌విరాన్‌మెంట్ నుండి python ఎంచుకోండి<br>3. డిపెండెన్సీలు (డెవ్ డిపెండెన్సీలు సహా) ఇన్స్టాల్ చేయండి: `pip install -e .[dev]` |

వాతావరణం సెట్ చేసిన తర్వాత, మీరు Agent Builder ద్వారా MCP క్లయింట్‌గా మీ స్థానిక అభివృద్ధి యంత్రంలో సర్వర్‌ను నడిపించవచ్చు ప్రారంభించడానికి:
1. VS Code డీబగ్గింగ్ ప్యానెల్ తెరవండి. `Debug in Agent Builder` ఎంచుకోండి లేదా `F5` నొక్కి MCP సర్వర్‌ను డీబగ్ చేయడం ప్రారంభించండి.
2. AI Toolkit Agent Builder ను ఉపయోగించి [ఈ ప్రాంప్ట్](../../../../../../../../../../../open_prompt_builder) తో సర్వర్‌ను టెస్ట్ చేయండి. సర్వర్ ఆటోమాటిక్‌గా Agent Builder కు కనెక్ట్ అవుతుంది.
3. ప్రాంప్ట్‌తో సర్వర్‌ను టెస్ట్ చేయడానికి `Run` క్లిక్ చేయండి.

**అభినందనాలు**! మీరు విజయవంతంగా Agent Builder ద్వారా MCP క్లయింట్‌గా వాతావరణ MCP సర్వర్‌ను మీ స్థానిక అభివృద్ధి యంత్రంలో నడిపించారు.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## టెంప్లేట్‌లో ఏమి ఉన్నాయి

| ఫోల్డర్ / ఫైల్| కంటెంట్                                    |
| ------------ | -------------------------------------------- |
| `.vscode`    | డీబగ్గింగ్ కోసం VSCode ఫైల్స్               |
| `.aitk`      | AI Toolkit కు సంబంధించిన కాన్ఫిగరేషన్లు        |
| `src`        | వాతావరణ mcp సర్వర్ యొక్క సోర్స్ కోడ్          |

## వాతావరణ MCP సర్వర్‌ను ఎలా డీబగ్ చేయాలి

> గమనికలు:
> - [MCP ఇన్స్పెక్టర్](https://github.com/modelcontextprotocol/inspector) MCP సర్వర్‌లను పరీక్షించడం మరియు డీబగ్గింగ్ చేయడానికి విజువల్ డెవలపర్ టూల్.
> - అన్ని డీబగ్గింగ్ మోడ్స్ బ్రేక్‌పాయింట్లను మద్దతిస్తున్నారు, అందువల్ల మీరు పరికరం అమలు కోడ్‌కు బ్రేక్‌పాయింట్లను జోడించవచ్చు.

| డీబగ్ మోడ్ | వివరణ | డీబగ్గింగ్ దశలు |
| ---------- | ----------- | --------------- |
| ఏజెంట్ బిల్డర్ | AI Toolkit ద్వారానే ఏజంట్ బిల్డర్‌లో MCP సర్వర్‌ను డీబగ్ చేయండి. | 1. VS Code డీబగ్ ప్యానెల్ తెరచండి. `Debug in Agent Builder` ఎంచుకోండి మరియు `F5` నొక్కి MCP సర్వర్‌ను డీబగింగ్ ప్రారంభించండి.<br>2. AI Toolkit Agent Builderతో [ఈ ప్రాంప్ట్](../../../../../../../../../../../open_prompt_builder) ఉపయోగించి సర్వర్‌ను పరీక్షించండి. సర్వర్ ఆటోతో ఏజెంట్ బిల్డర్‌కు కనెక్ట్ అవుతుంది.<br>3. ప్రాంప్ట్‌తో సర్వర్‌ను పరీక్షించడానికి `Run` క్లిక్ చేయండి. |
| MCP ఇన్స్పెక్టర్ | MCP ఇన్స్పెక్టర్ ఉపయోగించి MCP సర్వర్‌ను డీబగ్ చేయండి. | 1. [Node.js](https://nodejs.org/)ని ఇన్స్టాల్ చేయండి<br> 2. ఇన్స్పెక్టర్ సెట్ చేయండి: `cd inspector` && `npm install` <br> 3. VS Code డీబగ్గింగ్ ప్యానెల్ తెరచండి. `Debug SSE in Inspector (Edge)` లేదా `Debug SSE in Inspector (Chrome)` ఎంచుకోండి. `F5` నొక్కి డీబగ్గింగ్ ప్రారంభించండి.<br> 4. MCP ఇన్స్పెక్టర్ బ్రౌజర్‌లో ప్రారంభించినప్పుడు, ఈ MCP సర్వర్‌తో కనెక్ట్ కావడానికి `Connect` బటన్‌ను క్లిక్ చేయండి.<br> 5. తరువాత మీరు `List Tools` చేసి, ఒక పరికరం ఎంచుకుని, పరామితులను ఇన్పుట్ చేసి, `Run Tool`తో మీ సర్వర్ కోడ్‌ను డీబగ్ చేయొచ్చు.<br> |

## డిఫాల్ట్ పోర్ట్‌లు మరియు అనుకూలీకరణలు

| డీబగ్ మోడ్ | పోర్టులు | నిర్వచనాలు | అనుకూలీకరణలు | గమనిక |
| ---------- | ----- | ------------ | -------------- |-------------- |
| ఏజెంట్ బిల్డర్ | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | పై పోర్ట్స్ మార్చడానికి [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) ను సవరించండి. | लागू కాదు |
| MCP ఇన్స్పెక్టర్ | 3001 (సర్వర్); 5173 మరియు 3000 (ఇన్స్పెక్టర్) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | పై పోర్ట్స్ మార్చడానికి [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) ను సవరించండి. | लागू కాదు |

## అభిప్రాయం

ఈ టెంప్లేట్ గురించి మీకు ఏమైనా అభిప్రాయం లేదా సూచనలు ఉంటే, దయచేసి [AI Toolkit GitHub రిపోజిటరీ](https://github.com/microsoft/vscode-ai-toolkit/issues)లో ఒక ఇష్యూ ఓపెన్ చేయండి.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**అస్పష్టత**:
ఈ పత్రాన్ని AI అనువాద సేవ [Co-op Translator](https://github.com/Azure/co-op-translator) ఉపయోగించి అనువదించబడింది. మేము ఖచ్చితత్వానికి శ్రమిస్తున్నప్పటికీ, స్వయంచాలిత అనువాదాలలో తప్పులు లేదా లోపాలు ఉండవచ్చని గమనించండి. స్థానిక భాషలో ఉన్న ఒరిజినల్ పత్రం అధికారిక మూలంగా పరిగణించమవుతుంది. కీలక సమాచారం కోసం, ప్రొఫెషనల్ మానవ అనువాదం సిఫారసు చేయబడుతుంది. ఈ అనువాదం ఉపయోగం వల్ల ఏర్పడిన ఏవైనా గందరగోళాలు లేదా తప్పుతెలివులు కోసం మేము బాధ్యులు కాదు.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->