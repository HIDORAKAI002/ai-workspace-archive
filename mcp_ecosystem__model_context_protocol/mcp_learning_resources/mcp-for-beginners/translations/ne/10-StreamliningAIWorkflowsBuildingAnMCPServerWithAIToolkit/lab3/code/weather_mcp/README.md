# Weather MCP Server

यो Python मा एक नमूना MCP Server हो जसले mock प्रतिक्रियासहित weather tools कार्यान्वयन गर्दछ। यो तपाईंको आफ्नै MCP Server को लागि एक ढाँचाको रूपमा प्रयोग गर्न सकिन्छ। यसमा निम्न सुविधाहरू समावेश छन्:

- **Weather Tool**: एउटा उपकरण जुन दिइएको स्थानको आधारमा नकली मौसम जानकारी प्रदान गर्छ।
- **Agent Builder सँग जडान**: एक सुविधा जसले तपाईँलाई परीक्षण र डीबगिङको लागि MCP सर्वरलाई Agent Builder सँग जडान गर्न अनुमति दिन्छ।
- **[MCP Inspector](https://github.com/modelcontextprotocol/inspector) मा डीबग गर्नुहोस्**: एक सुविधा जसले तपाइँलाई MCP Inspector प्रयोग गरी MCP Server डीबग गर्न अनुमति दिन्छ।

## Weather MCP Server टेम्प्लेट संग सुरु गर्नुहोस्

> **पूर्वशर्तहरू**
>
> तपाइँको स्थानीय विकास मेसिनमा MCP Server चलाउनलाई, तपाइँलाई आवश्यक पर्नेछ:
>
> - [Python](https://www.python.org/)
> - (*वैकल्पिक - यदि तपाईं uv रोज्नुहुन्छ*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## वातावरण तयार पार्नुहोस्

यस परियोजनाको लागि वातावरण सेट अप गर्न दुई विधिहरू छन्। तपाईँ आफ्नो प्राथमिकताअनुसार कुनै एक चयन गर्न सक्नुहुन्छ।

> नोट: भर्चुअल वातावरण सिर्जना गरेपछि VSCode वा टर्मिनल पुन: लोड गर्नुहोस् ताकि भर्चुअल वातावरणको python प्रयोगमा आउँछ भन्ने सुनिश्चित होस्।

| विधि | चरणहरू |
| -------- | ----- |
| `uv` प्रयोग गर्दै | 1. भर्चुअल वातावरण सिर्जना गर्नुहोस्: `uv venv` <br>2. VSCode कमाण्ड "Python: Select Interpreter" चलाउनुहोस् र सिर्जना गरिएको भर्चुअल वातावरणबाट python चयन गर्नुहोस् <br>3. निर्भरता स्थापना गर्नुहोस् (डेभ निर्भरता सहित): `uv pip install -r pyproject.toml --extra dev` |
| `pip` प्रयोग गर्दै | 1. भर्चुअल वातावरण सिर्जना गर्नुहोस्: `python -m venv .venv` <br>2. VSCode कमाण्ड "Python: Select Interpreter" चलाउनुहोस् र सिर्जना गरिएको भर्चुअल वातावरणबाट python चयन गर्नुहोस्<br>3. निर्भरता स्थापना गर्नुहोस् (डेभ निर्भरता सहित): `pip install -e .[dev]` | 

वातावरण सेटअप गरेपछि, तपाईँले Agent Builder मार्फत MCP Client को रूपमा आफ्नै स्थानीय विकास मेसिनमा सर्वर चलाउन सक्नुहुन्छ:
1. VS Code को Debug प्यानल खोल्नुहोस्। `Debug in Agent Builder` चयन गर्नुहोस् वा MCP सर्वर डीबग गर्न `F5` थिच्नुहोस्।
2. AI Toolkit Agent Builder प्रयोग गरी [यस प्रॉम्प्ट](../../../../../../../../../../../open_prompt_builder) सँग सर्वर परीक्षण गर्नुहोस्। सर्वर स्वचालित रूपमा Agent Builder सँग जडित हुनेछ।
3. प्रॉम्प्टसँग सर्वर परीक्षण गर्न `Run` क्लिक गर्नुहोस्।

**बधाई छ**! तपाइँले सफलतापूर्वक Agent Builder मार्फत MCP Client को रूपमा आफ्नो स्थानीय विकास मेसिनमा Weather MCP Server चलाउनुभयो।
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## टेम्प्लेटमा के समावेश छ

| फोल्डर / फाइल| सामग्री                                          |
| ------------ | ------------------------------------------------ |
| `.vscode`    | डीबगिङको लागि VSCode फाइलहरू                     |
| `.aitk`      | AI Toolkit का कन्फिगरेसनहरू                      |
| `src`        | weather mcp server को स्रोत कोड                   |

## Weather MCP Server कसरी डीबग गर्ने

> नोटहरू:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) MCP सर्वरहरू परीक्षण र डीबगिङका लागि भिजुअल डेभलपर उपकरण हो।
> - सबै डीबगिङ मोडहरूले ब्रेकपोइन्टहरू समर्थन गर्छन्, त्यसैले तपाइँ टूल कार्यान्वयन कोडमा ब्रेकपोइन्टहरू थप्न सक्नुहुन्छ।

| डीबग मोड | विवरण | डीबग गर्ने चरणहरू |
| ---------- | ----------- | --------------- |
| Agent Builder | AI Toolkit मार्फत Agent Builder मा MCP Server डीबग गर्नुहोस्। | 1. VS Code Debug प्यानल खोल्नुहोस्। `Debug in Agent Builder` चयन गर्नुहोस् र MCP Server डीबग गर्न `F5` थिच्नुहोस्।<br>2. AI Toolkit Agent Builder प्रयोग गरी [यस प्रॉम्प्ट](../../../../../../../../../../../open_prompt_builder) सँग परीक्षण गर्नुहोस्। सर्वर स्वचालित रूपमा Agent Builder सँग जडान हुनेछ।<br>3. प्रॉम्प्टसँग सर्वर परीक्षण गर्न `Run` क्लिक गर्नुहोस्। |
| MCP Inspector | MCP Inspector प्रयोग गरी MCP Server डीबग गर्नुहोस्। | 1. [Node.js](https://nodejs.org/) इन्स्टल गर्नुहोस्<br> 2. Inspector सेटअप गर्नुहोस्: `cd inspector` && `npm install` <br> 3. VS Code Debug प्यानल खोल्नुहोस्। `Debug SSE in Inspector (Edge)` वा `Debug SSE in Inspector (Chrome)` चयन गर्नुहोस्। डीबग गर्न `F5` थिच्नुहोस्।<br> 4. MCP Inspector ब्राउजरमा खुलेपछि, `Connect` बटन क्लिक गरी यो MCP Server सँग जडान गर्नुहोस्।<br> 5. त्यसपछि तपाइँ `List Tools`, एउटा टूल चयन गर्नुहोस्, पेरामिटरहरू इनपुट गर्नुहोस्, र `Run Tool` गरेर आफ्नो सर्वर कोड डीबग गर्न सक्नुहुन्छ।<br> |

## पूर्वनिर्धारित पोर्टहरू र अनुकूलनहरू

| डीबग मोड | पोर्टहरू | परिभाषाहरू | अनुकूलनहरू | नोट |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | उपयुक्त पोर्ट परिवर्तन गर्न [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) सम्पादन गर्नुहोस्। | लागू हुँदैन |
| MCP Inspector | 3001 (सर्भर); 5173 र 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | उपयुक्त पोर्ट परिवर्तन गर्न [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) सम्पादन गर्नुहोस्। | लागू हुँदैन |

## प्रतिक्रिया

यदि तपाईंसँग यस टेम्प्लेटका लागि कुनै प्रतिक्रिया वा सुझावहरू छन् भने, कृपया [AI Toolkit GitHub repository](https://github.com/microsoft/vscode-ai-toolkit/issues) मा एक issue खोल्नुहोस्।

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**जानकारीको लागि**:
यो दस्तावेज AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) प्रयोग गरी अनुवाद गरिएको हो। हामी शुद्धतालाई ध्यानमा राखेर काम गर्छौं, तर कृपया जान्नुहोस् कि स्वचालित अनुवादमा त्रुटि वा असत्यता हुन सक्छ। मूल दस्तावेज आफ्नो मातृभाषामा प्रामाणिक स्रोतको रूपमा मानिनेछ। महत्वपूर्ण जानकारीको लागि, पेशेवर मानव अनुवाद सिफारिस गरिन्छ। यस अनुवादको प्रयोगबाट उत्पन्न भएका कुनै पनि गलतफहमी वा अर्थप्रतिको भ्रमको लागि हामी जिम्मेवार छैनौं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->