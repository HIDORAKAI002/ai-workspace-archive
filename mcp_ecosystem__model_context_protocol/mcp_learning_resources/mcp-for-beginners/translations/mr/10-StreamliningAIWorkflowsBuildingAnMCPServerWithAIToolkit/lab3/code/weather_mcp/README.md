# हवामान MCP सर्व्हर

हा पायथनमधील हवामान साधनेंसह मॉक प्रतिसादांची अंमलबजावणी करणारा नमुना MCP सर्व्हर आहे. आपण आपल्या स्वतःच्या MCP सर्व्हरसाठी याचा वापर कच्ची रचना म्हणून करू शकता. यात पुढील वैशिष्ट्यांचा समावेश आहे:

- **हवामान साधन**: दिलेल्या स्थानाच्या आधारावर मॉक केलेली हवामान माहिती पुरवणारे साधन.
- **एजेंट बिल्डरसह कनेक्ट करा**: चाचणी आणि डीबगिंगसाठी MCP सर्व्हर एजेंट बिल्डरशी कनेक्ट करण्याची सुविधा.
- **[MCP Inspector](https://github.com/modelcontextprotocol/inspector) मध्ये डीबग करा**: MCP Inspector वापरून MCP सर्व्हर डीबग करण्याची सुविधा.

## हवामान MCP सर्व्हर टेम्पलेटसह प्रारंभ करा

> **पूर्व-आवश्यकता**
>
> आपल्या स्थानिक विकास मशीनमध्ये MCP सर्व्हर चालवण्यासाठी आपल्याला खालील गोष्टी आवश्यक आहेत:
>
> - [Python](https://www.python.org/)
> - (*पर्यायी - जर आपण uv पसंत करत असाल*) [uv](https://github.com/astral-sh/uv)
> - [पायथन डीबगर एक्स्टेंशन](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## पर्यावरण तयार करा

या प्रकल्पासाठी पर्यावरण सेटअप करण्यासाठी दोन पद्धती आहेत. आपल्या पसंतीनुसार कोणतीही एक निवडा.

> टीप: वर्चुअल एन्व्हायर्नमेंट तयार केल्यानंतर VSCode किंवा टर्मिनल रीलोड करा जेणेकरून वर्चुअल एन्व्हायर्नमेंटचा पायथन वापरला जाईल.

| पद्धत | टप्पे |
| -------- | ----- |
| `uv` वापरून | 1. वर्चुअल एन्व्हायर्नमेंट तयार करा: `uv venv` <br>2. VSCode कमांड "***Python: Select Interpreter***" चालवा आणि तयार केलेल्या वर्चुअल एन्व्हायर्नमेंटमधील पायथन निवडा <br>3. अवलंबित्वे इंस्टॉल करा (डेव्हलपमेंट अवलंबित्वांसह): `uv pip install -r pyproject.toml --extra dev` |
| `pip` वापरून | 1. वर्चुअल एन्व्हायर्नमेंट तयार करा: `python -m venv .venv` <br>2. VSCode कमांड "***Python: Select Interpreter***" चालवा आणि तयार केलेल्या वर्चुअल एन्व्हायर्नमेंटमधील पायथन निवडा<br>3. अवलंबित्वे इंस्टॉल करा (डेव्हलपमेंट अवलंबित्वांसह): `pip install -e .[dev]` | 

पर्यावरण तयार केल्यावर, आपण स्थानिक विकास मशीनमध्ये Agent Builder च्या माध्यमातून MCP क्लायंट म्हणून सर्व्हर चालवू शकता:
1. VS Code डीबग पॅनेल उघडा. `Debug in Agent Builder` निवडा किंवा MCP सर्व्हर डीबगिंग सुरू करण्यासाठी `F5` दाबा.
2. Microsoft Foundry Toolkit Agent Builder वापरून या [प्रॉम्प्ट](../../../../../../../../../../../open_prompt_builder) सोबत सर्व्हरची चाचणी करा. सर्व्हर आपोआप एजेंट बिल्डरशी कनेक्ट होईल.
3. प्रॉम्प्टसह सर्व्हरची चाचणी करण्यासाठी `Run` क्लिक करा.

**अभिनंदन**! आपण यशस्वीपणे आपल्या स्थानिक विकास मशीनवर Agent Builder च्या माध्यमातून MCP क्लायंट म्हणून हवामान MCP सर्व्हर चालवले आहे.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## टेम्पलेटमध्ये काय समाविष्ट आहे

| फोल्डर / फाईल| सामग्री                                    |
| ------------ | -------------------------------------------- |
| `.vscode`    | डीबगिंगसाठी VSCode फायली                   |
| `.aitk`      | Microsoft Foundry Toolkit साठी कॉन्फिगरेशन                |
| `src`        | हवामान mcp सर्व्हरसाठी स्त्रोत कोड   |

## हवामान MCP सर्व्हर कसे डीबग करावे

> नोंदी:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) ही MCP सर्व्हर चाचणी व डीबगिंगसाठी एक दृश्य विकास साधन आहे.
> - सर्व डीबगिंग मोड ब्रेकपॉइंटसाठी समर्थन देतात, त्यामुळे आपण साधन कार्यान्वयन कोडमध्ये ब्रेकपॉइंट्स जोडू शकता.

| डीबग मोड | वर्णन | डीबग करण्याचे टप्पे |
| ---------- | ----------- | --------------- |
| एजेंट बिल्डर | Microsoft Foundry Toolkit मार्फत Agent Builder मध्ये MCP सर्व्हर डीबग करा. | 1. VS Code डीबग पॅनेल उघडा. `Debug in Agent Builder` निवडा व `F5` दाबून MCP सर्व्हर डीबगिंग सुरू करा.<br>2. Microsoft Foundry Toolkit Agent Builder वापरून या [प्रॉम्प्ट](../../../../../../../../../../../open_prompt_builder) सोबत सर्व्हरची चाचणी करा. सर्व्हर आपोआप एजंट बिल्डरशी कनेक्ट होईल.<br>3. प्रॉम्प्टसह सर्व्हरची चाचणी करण्यासाठी `Run` क्लिक करा. |
| MCP Inspector | MCP Inspector वापरून MCP सर्व्हर डीबग करा. | 1. [Node.js](https://nodejs.org/) इंस्टॉल करा<br> 2. Inspector सेटअप करा: `cd inspector` && `npm install` <br> 3. VS Code डीबग पॅनेल उघडा. `Debug SSE in Inspector (Edge)` किंवा `Debug SSE in Inspector (Chrome)` निवडा. डीबगिंग सुरू करण्यासाठी `F5` दाबा.<br> 4. जेव्हा MCP Inspector ब्राउझरमध्ये सुरू होईल, तेव्हा `Connect` बटण क्लिक करून या MCP सर्व्हरशी कनेक्ट करा.<br> 5. नंतर आपण `List Tools` करू शकता, एखादे साधन निवडा, पॅरामीटर्स इनपुट करा व `Run Tool` करून आपला सर्व्हर कोड डीबग करा.<br> |

## डीफॉल्ट पोर्ट्स आणि सानुकूलन

| डीबग मोड | पोर्ट्स | व्याख्या | सानुकूलन | टीप |
| ---------- | ----- | ------------ | -------------- |-------------- |
| एजेंट बिल्डर | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | वरील पोर्ट्स बदलण्यासाठी [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) संपादित करा. | लागू नाही |
| MCP Inspector | 3001 (सर्व्हर); 5173 आणि 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | वरील पोर्ट्स बदलण्यासाठी [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) संपादित करा.| लागू नाही |

## अभिप्राय

जर आपल्याकडे या टेम्पलेटसाठी काही अभिप्राय किंवा सूचना असतील, तर कृपया [Microsoft Foundry Toolkit GitHub रेपॉजिटरी](https://github.com/microsoft/vscode-ai-toolkit/issues) वर एक इश्यू उघडा.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
हा दस्तऐवज AI भाषांतर सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) चा वापर करून अनुवादित केला आहे. जरी आम्ही अचूकतेसाठी प्रयत्न करतो, तरी कृपया लक्षात घ्या की स्वयंचलित भाषांतरांमध्ये त्रुटी किंवा अचूकतेची कमतरता असू शकते. मूळ दस्तऐवज त्याच्या मूळ भाषेत अधिकृत स्रोत मानला पाहिजे. महत्त्वाची माहिती असल्यास, व्यावसायिक मानवी भाषांतराची शिफारस केली जाते. या भाषांतराच्या वापरामुळे उद्भवणाऱ्या कोणत्याही गैरसमज किंवा चुकीच्या अर्थलावणीसाठी आम्ही जबाबदार नाही.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->