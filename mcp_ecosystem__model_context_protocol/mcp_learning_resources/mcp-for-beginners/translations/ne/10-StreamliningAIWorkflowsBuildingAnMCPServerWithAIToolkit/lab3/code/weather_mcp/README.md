# Weather MCP Server

यो एउटा नमूना MCP सर्भर हो जुन Python मा मौसम उपकरणहरू मोकेको प्रतिक्रियाको साथ कार्यान्वयन गर्दछ। यसलाई तपाईँले आफ्नै MCP सर्भरको लागि ढाँचा रूपमा प्रयोग गर्न सक्नुहुन्छ। यसमा तलका सुविधाहरू समावेश छन्:

- **Weather Tool**: दिएको स्थानको आधारमा मौसम सम्बन्धी मोकेको जानकारी प्रदान गर्ने उपकरण।
- **Connect to Agent Builder**: MCP सर्भरलाई Agent Builder सँग परीक्षण र डिबगिंगको लागि जडान गर्न मिल्ने सुविधा।
- **Debug in [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: MCP Inspector प्रयोग गरी MCP सर्भर डिबग गर्न मिल्ने सुविधा।

## Weather MCP Server टेम्प्लेटसंग सुरु गर्नुहोस्

> **पूर्वआवश्यकताहरू**
>
> तपाईंको स्थानीय विकास मेसिनमा MCP सर्भर चलाउनका लागि:
>
> - [Python](https://www.python.org/)
> - (*वैकल्पिक - यदि uv रुचाउनुहुन्छ भने*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## वातावरण तयार गर्नुहोस्

यस परियोजनाको लागि वातावरण तयार पार्न दुई तरिकाहरू छन्। तपाईं आफ्नो प्राथमिकताअनुसार कुनै एक छनोट गर्न सक्नुहुन्छ।

> नोट: भर्चुअल वातावरण सिर्जना गरेपछि भर्चुअल वातावरणको python प्रयोग सुनिश्चित गर्न VSCode वा टर्मिनल रीलोड गर्नुहोस्।

| तरिका | चरणहरू |
| -------- | ----- |
| `uv` प्रयोग गरी | 1. भर्चुअल वातावरण बनाउनुहोस्: `uv venv` <br>2. VSCode आदेश "***Python: Select Interpreter***" चलाएर बनाएर भर्चुअल वातावरणको python चयन गर्नुहोस् <br>3. निर्भरता (डेबग समावेश) इन्स्टल गर्नुहोस्: `uv pip install -r pyproject.toml --extra dev` |
| `pip` प्रयोग गरी | 1. भर्चुअल वातावरण बनाउनुहोस्: `python -m venv .venv` <br>2. VSCode आदेश "***Python: Select Interpreter***" चलाएर बनाएर भर्चुअल वातावरणको python चयन गर्नुहोस्<br>3. निर्भरता (डेबग समावेश) इन्स्टल गर्नुहोस्: `pip install -e .[dev]` |

वातावरण सेटअप भइसकेपछि, तपाईं Agent Builder मार्फत MCP Client को रूपमा स्थानीय विकास मेसिनमा सर्भर चलाउन सक्नुहुन्छ:

1. VS Code को Debug प्यानल खोल्नुहोस्। `Debug in Agent Builder` चयन गर्नुहोस् वा MCP सर्भर डिबग गर्न `F5` थिच्नुहोस्।
2. Microsoft Foundry Toolkit Agent Builder प्रयोग गरी [यो प्रॉम्प्ट](../../../../../../../../../../../open_prompt_builder) सँग सर्भर परीक्षण गर्नुहोस्। सर्भर स्वचालित रूपमा Agent Builder सँग जडान हुनेछ।
3. `Run` थिचेर प्रॉम्प्टसँग सर्भर परीक्षण गर्नुहोस्।

**बधाई छ**! तपाईंले सफलतापूर्वक Agent Builder मार्फत MCP Client को रूपमा स्थानीय विकास मेसिनमा Weather MCP Server चलाउनुभएको छ।
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## टेम्प्लेटमा के के समावेश छ

| फोल्डर / फाइल| सामग्रीहरू                               |
| ------------ | ------------------------------------------ |
| `.vscode`    | डिबगिंगका लागि VSCode फाइलहरू             |
| `.aitk`      | Microsoft Foundry Toolkit को कन्फिगरेसनहरू |
| `src`        | मौसम mcp सर्भरको स्रोत कोड               |

## Weather MCP Server कसरी डिबग गर्ने

> नोटहरू:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) MCP सर्भरहरू परीक्षण र डिबग गर्नको लागि भिजुअल विकास उपकरण हो।
> - सबै डिबगिङ मोडहरूले ब्रेकप्वाइन्टलाई समर्थन गर्छन्, त्यसैले तपाईं उपकरण कार्यान्वयन कोडमा ब्रेकप्वाइन्ट थप्न सक्नुहुन्छ।

| डिबग मोड | विवरण | डिबग गर्ने चरणहरू |
| ---------- | ----------- | ------------------ |
| Agent Builder | Microsoft Foundry Toolkit मार्फत Agent Builder मा MCP सर्भर डिबग गर्नुहोस्। | 1. VS Code Debug प्यानल खोल्नुहोस्। `Debug in Agent Builder` चयन गरी `F5` थिचेर MCP सर्भर डिबग सुरु गर्नुहोस्।<br>2. Microsoft Foundry Toolkit Agent Builder प्रयोग गरी [यो प्रॉम्प्ट](../../../../../../../../../../../open_prompt_builder) सँग सर्भर परीक्षण गर्नुहोस्। सर्भर स्वचालित रूपमा Agent Builder सँग जडान हुनेछ।<br>3. प्रॉम्प्टसँग सर्भर परीक्षण गर्न `Run` थिच्नुहोस्। |
| MCP Inspector | MCP Inspector प्रयोग गरी MCP सर्भर डिबग गर्नुहोस्। | 1. [Node.js](https://nodejs.org/) इन्स्टल गर्नुहोस्।<br>2. Inspector सेटअप गर्नुहोस्: `cd inspector` && `npm install` <br>3. VS Code Debug प्यानल खोल्नुहोस्। `Debug SSE in Inspector (Edge)` वा `Debug SSE in Inspector (Chrome)` चयन गरी `F5` थिचेर डिबग सुरु गर्नुहोस्।<br>4. MCP Inspector ब्राउजरमा खुल्दा `Connect` बटन थिचेर यो MCP सर्भरमा जडान गर्नुहोस्।<br>5. त्यसपछि तपाईं `List Tools` गर्न सक्नुहुन्छ, उपकरण चयन गरेर, प्यारेमिटर इनपुट गरेर, र `Run Tool` थिचेर सर्भर कोड डिबग गर्न सक्नुहुन्छ।<br> |

## डिफल्ट पोर्टहरू र कस्टमाइजेसनहरू

| डिबग मोड | पोर्टहरू | परिभाषा | कस्टमाइजेसनहरू | नोट |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | माथिका पोर्टहरू परिवर्तन गर्न [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) सम्पादन गर्नुहोस्। | लागू हुँदैन |
| MCP Inspector | 3001 (सर्भर); 5173 र 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | माथिका पोर्टहरू परिवर्तन गर्न [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) सम्पादन गर्नुहोस्।| लागू हुँदैन |

## प्रतिक्रिया

यस टेम्प्लेटका लागि तपाईंको कुनै पनि प्रतिक्रिया वा सुझावहरू छन् भने, कृपया [Microsoft Foundry Toolkit GitHub repository](https://github.com/microsoft/vscode-ai-toolkit/issues) मा एउटा issue खोल्नुहोस्।

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
यो दस्तावेज़ AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) प्रयोग गरेर अनुवाद गरिएको हो। हामी सही हुन प्रयास गर्छौं, तर कृपया जानकार हुनुस् कि स्वचालित अनुवादमा त्रुटिहरू वा अशुद्धताहरू हुन सक्छन्। मूल दस्तावेज़ यसको मूल भाषामा आधिकारिक स्रोत मानिनुपर्छ। महत्वपूर्ण जानकारीका लागि व्यावसायिक मानव अनुवाद सिफारिस गरिन्छ। यस अनुवादको प्रयोगबाट उत्पन्न कुनै पनि गलत बुझाइ वा त्रुटिको लागि हामी जिम्मेवार छैनौं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->