# वेदर MCP सर्व्हर

हे एक नमुना MCP सर्व्हर आहे जे Python मध्ये हवामान साधने प्रतिकृती प्रतिसादांसह कार्यान्वित करते. हे तुमच्या स्वतःच्या MCP सर्व्हरसाठी एक चौकट म्हणून वापरले जाऊ शकते. यात खालील वैशिष्ट्ये समाविष्ट आहेत:

- **वेदर टूल**: दिलेल्या स्थानावर आधारित हवामान माहिती प्रदान करणारे साधन.
- **Git Clone Tool**: git रिपॉझिटरीला निर्दिष्ट फोल्डरमध्ये क्लोन करणारे साधन.
- **VS Code Open Tool**: फोल्डर VS Code किंवा VS Code Insiders मध्ये उघडण्याचे साधन.
- **Agent Builder शी कनेक्ट करा**: MCP सर्व्हर Agent Builder शी जोडण्यासाठीची सुविधा चाचणी आणि डिबगींगसाठी.
- **[MCP Inspector](https://github.com/modelcontextprotocol/inspector) मध्ये डिबग करा**: MCP Inspector वापरून MCP सर्व्हर डिबग करण्याची सुविधा.

## वेदर MCP सर्व्हर टेम्पलेटसह प्रारंभ करा

> **आवश्यकता**
>
> तुमच्या स्थानिक डेव्ह मशीनमध्ये MCP सर्व्हर चालवण्यासाठी, तुम्हाला आवश्यकता असेल:
>
> - [Python](https://www.python.org/)
> - [Git](https://git-scm.com/) (git_clone_repo टूलसाठी आवश्यक)
> - [VS Code](https://code.visualstudio.com/) किंवा [VS Code Insiders](https://code.visualstudio.com/insiders/) (open_in_vscode टूलसाठी आवश्यक)
> - (*ऐच्छिक - जर तुम्हाला uv प्राधान्य असेल*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## पर्यावरण तयार करा

या प्रोजेक्टसाठी पर्यावरण तयार करण्यासाठी दोन पर्याय आहेत. तुम्ही तुमच्या आवडीवरून कोणताही निवडू शकता.

> ध्यान दें: वर्चुअल पर्यावरण तयार केल्यानंतर VSCode किंवा टर्मिनल रीलोड करा जेणेकरून वर्चुअल पर्यावरणातील python वापरला जाईल.

| पर्याय | पावले |
| -------- | ----- |
| `uv` वापरून | 1. वर्चुअल पर्यावरण तयार करा: `uv venv` <br>2. VSCode आदेश चालवा "***Python: Select Interpreter***" आणि तयार केलेल्या वर्चुअल पर्यावरणातील python निवडा <br>3. अवलंबित्वे इन्स्टॉल करा (dev अवलंबित्वे सहित): `uv pip install -r pyproject.toml --extra dev` |
| `pip` वापरून | 1. वर्चुअल पर्यावरण तयार करा: `python -m venv .venv` <br>2. VSCode आदेश चालवा "***Python: Select Interpreter***" आणि तयार केलेल्या वर्चुअल पर्यावरणातील python निवडा <br>3. अवलंबित्वे इन्स्टॉल करा (dev अवलंबित्वे सहित): `pip install -e .[dev]` |

पर्यावरण तयार केल्यानंतर, तुम्ही Agent Builder अंतर्गत MCP Client म्हणून तुमच्या स्थानिक डेव्ह मशीनमध्ये सर्व्हर चालवू शकता:
1. VS Code डिबग पॅनेल उघडा. `Debug in Agent Builder` निवडा किंवा `F5` दाबून MCP सर्व्हर डिबगिंग सुरू करा.
2. AI Toolkit Agent Builder वापरून [हा प्रॉम्प्ट](../../../../../../../../../../../open_prompt_builder) वापरून सर्व्हरची चाचणी करा. सर्व्हर आपोआप Agent Builder शी जोडले जाईल.
3. `Run` क्लिक करा आणि प्रॉम्प्टसह सर्व्हरची चाचणी करा.

**अभिनंदन**! तुम्ही यशस्वीपणे Agent Builder अंतर्गत MCP Client म्हणून तुमच्या स्थानिक डेव्ह मशीनमध्ये वेदर MCP सर्व्हर चालविला आहे.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## टेम्पलेटमध्ये काय समाविष्ट आहे

| फोल्डर / फाइल | सामग्री                                      |
| ------------ | ------------------------------------------- |
| `.vscode`    | डिबगिंगसाठी VSCode फाइल्स                   |
| `.aitk`      | AI Toolkit साठी configuration घटक          |
| `src`        | वेदर mcp सर्व्हरचा स्रोत कोड               |

## वेदर MCP सर्व्हर कसा डिबग करायचा

> नोंदी:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) हे MCP सर्व्हर चाचणी आणि डिबगिंगसाठी एक दृश्य विकास साधन आहे.
> - सर्व डिबगिंग मोड ब्रेकपॉइंट्सना समर्थन करतात, त्यामुळे तुम्ही टूल अंमलबजावणी कोडमध्ये ब्रेकपॉइंट्स जोडू शकता.

## उपलब्ध साधने

### वेदर टूल
`get_weather` टूल दिलेल्या स्थानासाठी प्रतिकृती हवामान माहिती प्रदान करते.

| पॅरामीटर | प्रकार | वर्णन |
| --------- | ---- | ----------- |
| `location` | string | हवामान माहिती मिळविण्यासाठी स्थान (उदा. शहराचे नाव, राज्य, किंवा स्थानांक) |

### Git Clone Tool
`git_clone_repo` टूल git रिपॉझिटरी क्लोन करून निर्दिष्ट फोल्डरमध्ये ठेवते.

| पॅरामीटर | प्रकार | वर्णन |
| --------- | ---- | ----------- |
| `repo_url` | string | क्लोन करण्यासाठी git रिपॉझिटरीचा URL |
| `target_folder` | string | ज्या फोल्डरमध्ये रिपॉझिटरी क्लोन करायची आहे त्याचा मार्ग |

हे टूल खालील JSON ऑब्जेक्ट परत करते:
- `success`: ऑपरेशन यशस्वी झाल्याचे दर्शवणारा Boolean
- `target_folder` किंवा `error`: क्लोन केलेल्या रिपॉझिटरीचा मार्ग किंवा त्रुटी संदेश

### VS Code Open Tool
`open_in_vscode` टूल VS Code किंवा VS Code Insiders अ‍ॅप्लिकेशनमध्ये फोल्डर उघडते.

| पॅरामीटर | प्रकार | वर्णन |
| --------- | ---- | ----------- |
| `folder_path` | string | उघडण्याकरिता फोल्डरचा पथ |
| `use_insiders` | boolean (ऐच्छिक) | रेग्युलर VS Code ऐवजी VS Code Insiders वापरायचे का |

हे टूल खालील JSON ऑब्जेक्ट परत करते:
- `success`: ऑपरेशन यशस्वी झाल्याचा सूचक Boolean
- `message` किंवा `error`: पुष्टीचा संदेश किंवा त्रुटी संदेश

| डिबग मोड | वर्णन | डिबग करण्याची पावले |
| ---------- | ----------- | --------------- |
| Agent Builder | AI Toolkit च्या Agent Builder मध्ये MCP सर्व्हर डिबग करणे. | 1. VS Code डिबग पॅनेल उघडा. `Debug in Agent Builder` निवडा आणि `F5` दाबून MCP सर्व्हर डिबगिंग सुरू करा. <br>2. AI Toolkit Agent Builder वापरून [हा प्रॉम्प्ट](../../../../../../../../../../../open_prompt_builder) वापरा. सर्व्हर आपोआप Agent Builder शी जोडले जाईल. <br>3. प्रॉम्प्टसह सर्व्हर चाचणीसाठी `Run` क्लिक करा. |
| MCP Inspector | MCP Inspector वापरून MCP सर्व्हर डिबग करा. | 1. [Node.js](https://nodejs.org/) इन्स्टॉल करा <br>2. Inspector सेटअप करा: `cd inspector` && `npm install` <br>3. VS Code डिबग पॅनेल उघडा. `Debug SSE in Inspector (Edge)` किंवा `Debug SSE in Inspector (Chrome)` निवडा आणि F5 दाबा. <br>4. जेव्हा MCP Inspector ब्राउझरमध्ये सुरू होईल, तेव्हा `Connect` बटणावर क्लिक करा आणि हा MCP सर्व्हर जोडा. <br>5. नंतर तुम्ही `List Tools` वापरून टूल निवडा, पॅरामीटर्स प्रविष्ट करा, आणि `Run Tool` करून तुमचा सर्व्हर कोड डिबग करा. <br> |

## डीफॉल्ट पोर्ट्स आणि सानुकूलन

| डिबग मोड | पोर्ट्स | व्याख्या | सानुकूलने | टिप्पणी |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | वर दिलेल्या पोर्ट्स बदलण्यासाठी [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) संपादित करा. | लागू नाही |
| MCP Inspector | 3001 (सर्व्हर); 5173 आणि 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | वर दिलेल्या पोर्ट्स बदलण्यासाठी [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) संपादित करा.| लागू नाही |

## अभिप्राय

जर तुम्हाला या टेम्पलेटबद्दल कोणताही अभिप्राय किंवा सूचना असतील, तर कृपया [AI Toolkit GitHub repository](https://github.com/microsoft/vscode-ai-toolkit/issues) वर एक इश्यु उघडा.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
हा दस्तऐवज AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) वापरून अनुवादित केला आहे. आम्ही अचूकतेसाठी प्रयत्न करतो, तरी कृपया लक्षात ठेवा की स्वयंचलित अनुवादांमध्ये चुका किंवा अचूकतेचा अभाव असू शकतो. मूळ दस्तऐवज त्याच्या स्थानिक भाषेत अधिकृत स्रोत म्हणून मानला पाहिजे. महत्त्वाच्या माहितीसाठी व्यावसायिक मानवी अनुवादाचा सल्ला घेतला जातो. या अनुवादाच्या वापरामुळे उद्भवलेल्या कोणत्याही गैरसमज किंवा चुकीच्या अर्थलागीसाठी आम्ही जबाबदार नाही.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->