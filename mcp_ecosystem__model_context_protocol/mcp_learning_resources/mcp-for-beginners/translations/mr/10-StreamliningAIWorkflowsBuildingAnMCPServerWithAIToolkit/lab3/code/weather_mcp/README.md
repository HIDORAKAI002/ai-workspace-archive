# हवामान MCP सर्व्हर

हा Python मध्ये हवामान साधने समाविष्ट करणारा नमुना MCP सर्व्हर आहे ज्यात नकली प्रतिसाद आहेत. तो तुमच्या स्वतःच्या MCP सर्व्हरसाठी एक आराखडा म्हणून वापरला जाऊ शकतो. यात खालील वैशिष्ट्ये समाविष्ट आहेत:

- **हवामान साधन**: दिलेल्या ठिकाणावर आधारित नकली हवामान माहिती प्रदान करणारे साधन.
- **एजंट बिल्डरशी कनेक्ट करा**: MCP सर्व्हर एजंट बिल्डरशी जोडण्यासाठी वापरले जाणारे वैशिष्ट्य, परीक्षण आणि डीबगिंगसाठी.
- **[MCP Inspector](https://github.com/modelcontextprotocol/inspector) मध्ये डीबग करा**: MCP Inspector वापरून MCP सर्व्हरचे डीबगिंग करण्याची सोय.

## हवामान MCP सर्व्हर टेम्प्लेटसह प्रारंभ करा

> **पूर्वअट**
>
> तुमच्या स्थानिक विकास मशीनवर MCP सर्व्हर चालवण्यासाठी, तुम्हाला गरज असेल:
>
> - [Python](https://www.python.org/)
> - (*ऐच्छिक - जर तुम्हाला uv प्राधान्य असेल तर*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger विस्तार](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## वातावरण तयार करा

या प्रकल्पासाठी वातावरण सेटअप करण्यासाठी दोन दृष्टिकोन आहेत. तुम्ही तुमच्या पसंतीनुसार कोणताही एक निवडू शकता.

> नोंद: वर्चुअल वातावरण तयार केल्यानंतर लक्षात ठेवा की VSCode किंवा टर्मिनल पुन्हा लोड करा जेणेकरून वर्चुअल वातावरणाचा Python वापरला जाईल.

| दृष्टिकोन | पायऱ्या |
| -------- | ----- |
| `uv` वापरून | 1. वर्चुअल वातावरण तयार करा: `uv venv` <br>2. VSCode मध्ये कमांड "***Python: Select Interpreter***" चालवा आणि तयार केलेल्या वर्चुअल वातावरणातील python निवडा<br>3. अवलंबित्वे (Dev dependencies सह) इंस्टॉल करा: `uv pip install -r pyproject.toml --extra dev` |
| `pip` वापरून | 1. वर्चुअल वातावरण तयार करा: `python -m venv .venv` <br>2. VSCode मध्ये कमांड "***Python: Select Interpreter***" चालवा आणि तयार केलेल्या वर्चुअल वातावरणातील python निवडा<br>3. अवलंबित्वे (Dev dependencies सह) इंस्टॉल करा: `pip install -e .[dev]` |

वातावरण सेटअप केल्यानंतर, तुम्ही Agent Builder वापरून स्थानिक विकास मशीनवर MCP क्लायंट म्हणून सर्व्हर चालवू शकता आणि प्रारंभ करू शकता:
1. VS Code डीबग पॅनेल उघडा. `Debug in Agent Builder` निवडा किंवा MCP सर्व्हर डीबग करण्यासाठी `F5` दाबा.
2. AI Toolkit Agent Builder वापरून सर्व्हर या [प्रॉम्प्टसह तपासा](../../../../../../../../../../../open_prompt_builder). सर्व्हर आपोआप एजंट बिल्डरशी जोडले जाईल.
3. सर्व्हर तपासण्यासाठी `Run` क्लिक करा.

**अभिनंदन**! तुम्ही यशस्वीपणे Agent Builder च्या माध्यमातून स्थानिक विकास मशीनवर MCP क्लायंट म्हणून हवामान MCP सर्व्हर चालवला आहे.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## टेम्प्लेटमध्ये काय समाविष्ट आहे

| फोल्डर / फाइल | सामग्री                                     |
| -------------- | ------------------------------------------- |
| `.vscode`      | डीबगिंगसाठी VSCode फायली                    |
| `.aitk`        | AI Toolkit साठी कॉन्फिगरेशन                  |
| `src`          | हवामान mcp सर्व्हरसाठी स्रोत कोड              |

## हवामान MCP सर्व्हर कसा डीबग करावा

> नोंदी:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) हा MCP सर्व्हर परीक्षण आणि डीबगिंगसाठी दृष्यात्मक विकसक साधन आहे.
> - सर्व डीबगिंग मोड ब्रेकपॉइंट्सना समर्थन देतात, त्यामुळे तुम्ही टूल अंमलबजावणी कोडमध्ये ब्रेकपॉइंट्स जोडू शकता.

| डीबग मोड | वर्णन | डीबग कसे करावे |
| -------- | ------- | ---------------- |
| एजंट बिल्डर | MCP सर्व्हर AI Toolkit च्या माध्यमातून एजंट बिल्डरमध्ये डीबग करा. | 1. VS Code डीबग पॅनेल उघडा. `Debug in Agent Builder` निवडा आणि डीबग सुरु करण्यासाठी `F5` दाबा.<br>2. AI Toolkit Agent Builder वापरून [हा प्रॉम्प्ट](../../../../../../../../../../../open_prompt_builder) वापरून सर्व्हर तपासा. सर्व्हर आपोआप एजंट बिल्डरशी जोडला जाईल.<br>3. प्रॉम्प्टसह सर्व्हर तपासण्यासाठी `Run` क्लिक करा. |
| MCP Inspector | MCP Inspector वापरून MCP सर्व्हर डीबग करा. | 1. [Node.js](https://nodejs.org/) इंस्टॉल करा<br>2. Inspector सेटअप करा: `cd inspector` && `npm install`<br>3. VS Code डीबग पॅनेल उघडा. `Debug SSE in Inspector (Edge)` किंवा `Debug SSE in Inspector (Chrome)` निवडा. डीबग सुरु करण्यासाठी F5 दाबा.<br>4. जेव्हा MCP Inspector ब्राउझरमध्ये उघडेल, तेव्हा `Connect` बटणावर क्लिक करा आणि या MCP सर्व्हरशी कनेक्ट व्हा.<br>5. त्यानंतर तुम्ही `List Tools` करू शकता, एखादे टूल निवडा, पॅरामीटर्स भरा आणि `Run Tool` करून तुमचा सर्व्हर कोड डीबग करा.<br> |

## डीफॉल्ट पोर्ट्स आणि सानुकूलने

| डीबग मोड | पोर्ट्स | व्याख्या | सानुकूलने | नोंद |
| -------- | ------- | --------- | ------------ | ----- |
| एजंट बिल्डर | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | वर दिलेले पोर्ट बदलण्यासाठी [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) संपादित करा. | लागू नाही |
| MCP Inspector | 3001 (सर्व्हर); 5173 आणि 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | वर दिलेले पोर्ट बदलण्यासाठी [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) संपादित करा. | लागू नाही |

## अभिप्राय

जर तुम्हाला या टेम्प्लेटसाठी काही अभिप्राय किंवा सूचना असतील तर कृपया [AI Toolkit GitHub संग्रहालय](https://github.com/microsoft/vscode-ai-toolkit/issues) वर एक समस्या उघडा.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
हा दस्तऐवज AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) वापरून भाषांतरित केला आहे. आम्ही अचूकतेसाठी प्रयत्न करतो, परंतु कृपया ध्यानात घ्या की स्वयंचलित अनुवादांमध्ये त्रुटी किंवा अचूकतेची कमतरता असू शकते. मूळ दस्तऐवज त्याच्या स्थानिक भाषेत अधिकृत स्रोत मानला जावा. महत्त्वाच्या माहितीसाठी व्यावसायिक मानवी अनुवाद शिफारसीय आहे. या अनुवादावरून उद्भवणाऱ्या कोणत्याही गैरसमजुतीसाठी किंवा चुकीच्या अर्थसंकल्पांसाठी आम्ही जबाबदार नाही.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->