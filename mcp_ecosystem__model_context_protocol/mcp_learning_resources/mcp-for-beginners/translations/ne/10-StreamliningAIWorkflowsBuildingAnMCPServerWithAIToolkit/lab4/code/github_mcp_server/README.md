# मौसम MCP सर्भर

यो Python मा मौसम उपकरणहरूसहित मक प्रतिक्रियाहरू लागू गर्ने नमूना MCP सर्भर हो। यसलाई तपाईंको आफ्नै MCP सर्भरको लागि एक आधारको रूपमा प्रयोग गर्न सकिन्छ। यसमा निम्न सुविधाहरू समावेश छन्:

- **मौसम उपकरण**: दिइएको स्थानको आधारमा मक गरिएको मौसम जानकारी प्रदान गर्ने उपकरण।
- **Git Clone उपकरण**: एक git रिपोजिटरीलाई निर्दिष्ट गरिएको फोल्डरमा क्लोन गर्ने उपकरण।
- **VS Code Open उपकरण**: VS Code वा VS Code Insiders मा फोल्डर खोल्ने उपकरण।
- **Agent Builder सँग जडान**: परीक्षण र डिबगिङका लागि MCP सर्भरलाई Agent Builder सँग जडान गर्न सकिने सुविधा।
- **[MCP Inspector](https://github.com/modelcontextprotocol/inspector) मा डिबग गर्न**: MCP Inspector प्रयोग गरी MCP सर्भरलाई डिबग गर्न सकिने सुविधा।

## मौसम MCP सर्भर टेम्प्लेटसँग सुरु गर्नुहोस्

> **पूर्व आवश्यकताहरू**
>
> तपाईंको स्थानीय विकास मेसिनमा MCP सर्भर चलाउनको लागि तपाईंलाई चाहिन्छ:
>
> - [Python](https://www.python.org/)
> - [Git](https://git-scm.com/) (git_clone_repo उपकरणका लागि आवश्यक)
> - [VS Code](https://code.visualstudio.com/) वा [VS Code Insiders](https://code.visualstudio.com/insiders/) (open_in_vscode उपकरणका लागि आवश्यक)
> - (*ऐच्छिक - यदि तपाईं uv मन पराउनुहुन्छ भने*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## वातावरण तयार गर्नुहोस्

यस परियोजनाको वातावरण सेटअप गर्न दुई तरिका छन्। तपाईं आफ्नो रुचि अनुसार कुनै एक छनोट गर्न सक्नुहुन्छ।

> नोट: भर्चुअल वातावरण सिर्जना गरेपछि VSCode वा टर्मिनल पुनः लोड गर्नुहोस् ताकि भर्चुअल वातावरणको python प्रयोग होस्।

| तरिका | चरणहरू |
| -------- | ----- |
| `uv` प्रयोग गर्दै | 1. भर्चुअल वातावरण सिर्जना गर्नुहोस्: `uv venv` <br>2. VSCode आदेश "***Python: Select Interpreter***" चलाउनुहोस् र सिर्जना गरिएको भर्चुअल वातावरणबाट python छान्नुहोस् <br>3. निर्भरता स्थापना गर्नुहोस् (डेभ निर्भरता सहित): `uv pip install -r pyproject.toml --extra dev` |
| `pip` प्रयोग गर्दै | 1. भर्चुअल वातावरण सिर्जना गर्नुहोस्: `python -m venv .venv` <br>2. VSCode आदेश "***Python: Select Interpreter***" चलाउनुहोस् र सिर्जना गरिएको भर्चुअल वातावरणबाट python छान्नुहोस्<br>3. निर्भरता स्थापना गर्नुहोस् (डेभ निर्भरता सहित): `pip install -e .[dev]` |

पर्यावरण सेटअप गरेपछि, तपाईंले स्थानीय विकास मेसिनमा Agent Builder मार्फत MCP Client को रूपमा सर्भर चलाउन सक्नुहुन्छ:
1. VS Code को डिबग प्यानल खोल्नुहोस्। `Debug in Agent Builder` छान्नुहोस् वा MCP सर्भर डिबग गर्न `F5` थिच्नुहोस्।
2. एआई उपकरण Agent Builder प्रयोग गरेर [यस प्रम्प्ट](../../../../../../../../../../../open_prompt_builder) सँग सर्भर परीक्षण गर्नुहोस्। सर्भर स्वचालित रूपमा Agent Builder सँग जडान हुनेछ।
3. प्रम्प्टसँग सर्भर परीक्षण गर्न `Run` क्लिक गर्नुहोस्।

**बधाइ!** तपाईंले सफलतापूर्वक स्थानीय विकास मेसिनमा Agent Builder मार्फत MCP Client को रूपमा Weather MCP Server चलाउनुभयो।
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## टेम्प्लेटमा के समावेश छ

| फोल्डर / फाइल | सामग्री                                     |
| ------------ | -------------------------------------------- |
| `.vscode`    | डिबगिङका लागि VSCode फाइलहरू                   |
| `.aitk`      | AI Toolkit को लागि कन्फिगरेसनहरू               |
| `src`        | मौसम mcp सर्भरको स्रोत कोड                      |

## Weather MCP Server कसरी डिबग गर्ने

> नोटहरू:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) MCP सर्भरहरू परीक्षण र डिबग गर्नको लागि भिजुअल विकास उपकरण हो।
> - सबै डिबगिङ मोडहरूले ब्रेकप्वाइन्ट समर्थन गर्छन्, त्यसैले तपाईं उपकरण कार्यान्वयन कोडमा ब्रेकप्वाइन्ट थप्न सक्नुहुन्छ।

## उपलब्ध उपकरणहरू

### मौसम उपकरण
`get_weather` उपकरणले निर्दिष्ट गरिएको स्थानको लागि मक गरिएको मौसम जानकारी प्रदान गर्छ।

| प्यारामिटर | प्रकार | वर्णन |
| --------- | ---- | ----------- |
| `location` | string | मौसम प्राप्त गर्नुपर्ने स्थान (जस्तै, सहरको नाम, राज्य, वा निर्देशांकहरू) |

### Git Clone उपकरण
`git_clone_repo` उपकरणले git रिपोजिटरीलाई निर्दिष्ट फोल्डरमा क्लोन गर्छ।

| प्यारामिटर | प्रकार | वर्णन |
| --------- | ---- | ----------- |
| `repo_url` | string | क्लोन गर्नुपर्ने git रिपोजिटरीको URL |
| `target_folder` | string | रिपोजिटरी क्लोन गर्ने फोल्डरको पथ |

उपकरणले JSON वस्तु फर्काउँछ:
- `success`: अपरेशन सफल भयो कि भएन भनी सूचित गर्ने बूलियन
- `target_folder` वा `error`: क्लोन गरिएको रिपोजिटरीको पथ वा त्रुटि सन्देश

### VS Code Open उपकरण
`open_in_vscode` उपकरणले फोल्डरलाई VS Code वा VS Code Insiders एपमा खोल्दछ।

| प्यारामिटर | प्रकार | वर्णन |
| --------- | ---- | ----------- |
| `folder_path` | string | खोल्नुपर्ने फोल्डरको पथ |
| `use_insiders` | boolean (ऐच्छिक) | साधारण VS Code को सट्टा VS Code Insiders प्रयोग गर्ने कि नगर्ने |

उपकरणले JSON वस्तु फर्काउँछ:
- `success`: अपरेशन सफल भयो कि भएन भनी सूचित गर्ने बूलियन
- `message` वा `error`: पुष्टि सन्देश वा त्रुटि सन्देश

| डिबग मोड | वर्णन | डिबग गर्ने चरणहरू |
| ---------- | ----------- | --------------- |
| Agent Builder | AI Toolkit मार्फत Agent Builder मा MCP सर्भर डिबग गर्नुहोस्। | 1. VS Code डिबग प्यानल खोल्नुहोस्। `Debug in Agent Builder` छान्नुहोस् र MCP सर्भर डिबग गर्न `F5` थिच्नुहोस्।<br>2. AI Toolkit Agent Builder प्रयोग गरी सर्भरलाई [यस प्रम्प्ट](../../../../../../../../../../../open_prompt_builder) सँग परीक्षण गर्नुहोस्। सर्भर स्वचालित रूपमा Agent Builder सँग जडित हुनेछ।<br>3. प्रम्प्टसँग सर्भर परीक्षण गर्न `Run` क्लिक गर्नुहोस्। |
| MCP Inspector | MCP Inspector प्रयोग गरी MCP सर्भर डिबग गर्नुहोस्। | 1. [Node.js](https://nodejs.org/) इन्स्टल गर्नुहोस्<br> 2. Inspector सेटअप गर्नुहोस्: `cd inspector` && `npm install` <br> 3. VS Code डिबग प्यानल खोल्नुहोस्। `Debug SSE in Inspector (Edge)` वा `Debug SSE in Inspector (Chrome)` छान्नुहोस्। `F5` थिचेर डिबग सुरु गर्नुहोस्।<br> 4. MCP Inspector ब्राउजरमा खुल्ने बेला `Connect` बटन थिचेर यो MCP सर्भर जडान गर्नुहोस्।<br> 5. त्यसपछि तपाईं `List Tools` गर्न, एउटा उपकरण छान्न, प्यारामिटरहरू इनपुट गर्न, र `Run Tool` गरेर आफ्नो सर्भर कोड डिबग गर्न सक्नुहुन्छ।<br> |

## पूर्वनिर्धारित पोर्टहरू र अनुकूलनहरू

| डिबग मोड | पोर्टहरू | परिभाषाहरू | अनुकूलनहरू | नोट |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | माथिका पोर्टहरू परिवर्तन गर्न [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) सम्पादन गर्नुहोस्। | लागू हुँदैन |
| MCP Inspector | 3001 (सर्भर); 5173 र 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | माथिका पोर्टहरू परिवर्तन गर्न [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) सम्पादन गर्नुहोस्। | लागू हुँदैन |

## प्रतिक्रिया

यदि तपाईंलाई यस टेम्प्लेटको बारेमा कुनै प्रतिक्रिया वा सुझाव छ भने, कृपया [AI Toolkit GitHub रिपोजिटरी](https://github.com/microsoft/vscode-ai-toolkit/issues) मा समस्या (issue) खोल्नुहोस्।

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
यो दस्तावेज AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) प्रयोग गरी अनुवाद गरिएको हो। हामी सही हुने प्रयास गर्छौं भने पनि, कृपया ध्यान दिनुहोस् कि स्वचालित अनुवादहरूमा त्रुटिहरू वा अशुद्धिहरू हुन सक्छन्। मूल दस्तावेज यसको मूल भाषामा अधिकारिक स्रोतको रूपमा मानिनु पर्छ। महत्वपूर्ण सूचनाहरूका लागि व्यावसायिक मानव अनुवाद सिफारिस गरिन्छ। यस अनुवादको प्रयोगबाट उत्पन्न भएका कुनै पनि गलतफहमी वा गलत व्याख्याका लागि हामी जिम्मेवार छैनौं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->