# Weather MCP Server

यह Python में एक सैंपल MCP Server है जो मौसम उपकरणों को मॉक प्रतिक्रियाओं के साथ लागू करता है। इसे आपके अपने MCP Server के लिए एक ढांचे के रूप में इस्तेमाल किया जा सकता है। इसमें निम्नलिखित विशेषताएं शामिल हैं:

- **Weather Tool**: एक उपकरण जो दिए गए स्थान के आधार पर मॉक किया गया मौसम संबंधी जानकारी प्रदान करता है।
- **Git Clone Tool**: एक उपकरण जो एक git रिपॉजिटरी को निर्दिष्ट फ़ोल्डर में क्लोन करता है।
- **VS Code Open Tool**: एक उपकरण जो VS Code या VS Code Insiders में एक फ़ोल्डर खोलता है।
- **Connect to Agent Builder**: एक सुविधा जो आपको परीक्षण और डीबगिंग के लिए MCP सर्वर को Agent Builder से जोड़ने की अनुमति देती है।
- **Debug in [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: एक सुविधा जो आपको MCP Inspector का उपयोग करके MCP Server का डीबग करने देती है।

## Weather MCP Server टेम्पलेट के साथ शुरुआत करें

> **पूर्व आवश्यकताएँ**
>
> अपने लोकल डिवेलपमेंट मशीन पर MCP Server चलाने के लिए, आपको यह आवश्यक होगा:
>
> - [Python](https://www.python.org/)
> - [Git](https://git-scm.com/) (git_clone_repo टूल के लिए आवश्यक)
> - [VS Code](https://code.visualstudio.com/) या [VS Code Insiders](https://code.visualstudio.com/insiders/) (open_in_vscode टूल के लिए आवश्यक)
> - (*वैकल्पिक - यदि आप uv पसंद करते हैं*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## पर्यावरण तैयार करें

इस प्रोजेक्ट के लिए पर्यावरण सेटअप करने के दो तरीके हैं। आप अपनी पसंद के अनुसार कोई एक चुन सकते हैं।

> नोट: वर्चुअल पर्यावरण बनाने के बाद यह सुनिश्चित करने के लिए VSCode या टर्मिनल को पुनः लोड करें कि वर्चुअल पर्यावरण का पाइथन उपयोग में हो।

| तरीका | चरण |
| -------- | ----- |
| `uv` का उपयोग | 1. वर्चुअल पर्यावरण बनाएँ: `uv venv` <br>2. VSCode कमांड "***Python: Select Interpreter***" चलाएँ और बनाए गए वर्चुअल पर्यावरण का पाइथन चुनें <br>3. डिपेंडेंसीज़ इंस्टॉल करें (डेव डिपेंडेंसीज़ सहित): `uv pip install -r pyproject.toml --extra dev` |
| `pip` का उपयोग | 1. वर्चुअल पर्यावरण बनाएँ: `python -m venv .venv` <br>2. VSCode कमांड "***Python: Select Interpreter***" चलाएँ और बनाए गए वर्चुअल पर्यावरण का पाइथन चुनें<br>3. डिपेंडेंसीज़ इंस्टॉल करें (डेव डिपेंडेंसीज़ सहित): `pip install -e .[dev]` |

पर्यावरण सेटअप करने के बाद, आप Agent Builder के माध्यम से MCP क्लाइंट के रूप में अपने लोकल डिव मशीन में सर्वर चला सकते हैं:
1. VS Code Debug पैनल खोलें। `Debug in Agent Builder` चुनें या MCP सर्वर को डीबग करने के लिए `F5` दबाएँ।
2. एआई टूलकिट Agent Builder का उपयोग करके [इस प्रॉम्प्ट](../../../../../../../../../../../open_prompt_builder) से सर्वर का परीक्षण करें। सर्वर अपने आप Agent Builder से जुड़ जाएगा।
3. परीक्षण के लिए `Run` पर क्लिक करें।

**बधाई हो**! आपने सफलतापूर्वक Agent Builder के माध्यम से MCP क्लाइंट के रूप में अपने लोकल डिव मशीन में Weather MCP Server चलाया है।
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## टेम्पलेट में क्या शामिल है

| फ़ोल्डर / फ़ाइल| सामग्री                                    |
| ------------ | ---------------------------------------------- |
| `.vscode`    | डीबगिंग के लिए VSCode फ़ाइलें                    |
| `.aitk`      | AI Toolkit के लिए कॉन्फ़िगरेशन                  |
| `src`        | वेदर MCP सर्वर का स्रोत कोड                      |

## Weather MCP Server को कैसे डीबग करें

> नोट्स:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) MCP सर्वरों के परीक्षण और डीबगिंग के लिए एक विज़ुअल डेवलपर टूल है।
> - सभी डीबगिंग मोड ब्रेकपॉइंट का समर्थन करते हैं, इसलिए आप टूल इम्प्लिमेंटेशन कोड में ब्रेकपॉइंट्स जोड़ सकते हैं।

## उपलब्ध टूल्स

### Weather Tool
`get_weather` टूल निर्दिष्ट स्थान के लिए मॉक किया गया मौसम संबंधी जानकारी प्रदान करता है।

| पैरामीटर | प्रकार | विवरण |
| --------- | ---- | ----------- |
| `location` | string | मौसम जानकारी प्राप्त करने के लिए स्थान (जैसे शहर का नाम, राज्य, या निर्देशांक) |

### Git Clone Tool
`git_clone_repo` टूल एक git रिपॉजिटरी को निर्दिष्ट फ़ोल्डर में क्लोन करता है।

| पैरामीटर | प्रकार | विवरण |
| --------- | ---- | ----------- |
| `repo_url` | string | क्लोन करने के लिए git रिपॉजिटरी का URL |
| `target_folder` | string | वह फ़ोल्डर जहाँ रिपॉजिटरी क्लोन करनी है |

यह टूल एक JSON ऑब्जेक्ट लौटाता है जिसमें:
- `success`: Boolean जो बताता है कि ऑपरेशन सफल था या नहीं
- `target_folder` या `error`: क्लोन की गई रिपॉजिटरी का पथ या एक त्रुटि संदेश

### VS Code Open Tool
`open_in_vscode` टूल एक फ़ोल्डर को VS Code या VS Code Insiders एप्लिकेशन में खोलता है।

| पैरामीटर | प्रकार | विवरण |
| --------- | ---- | ----------- |
| `folder_path` | string | खोलने के लिए फ़ोल्डर का पथ |
| `use_insiders` | boolean (optional) | क्या नियमित VS Code की बजाय VS Code Insiders का उपयोग करना है |

यह टूल एक JSON ऑब्जेक्ट लौटाता है जिसमें:
- `success`: Boolean जो बताता है कि ऑपरेशन सफल था या नहीं
- `message` या `error`: पुष्टि संदेश या त्रुटि संदेश

| डीबग मोड | विवरण | डीबग करने के चरण |
| ---------- | ----------- | --------------- |
| Agent Builder | AI Toolkit के माध्यम से Agent Builder में MCP सर्वर को डीबग करें। | 1. VS Code Debug पैनल खोलें। `Debug in Agent Builder` चुनें और MCP सर्वर को डीबग करने के लिए `F5` दबाएँ।<br>2. एआई टूलकिट Agent Builder का उपयोग कर [इस प्रॉम्प्ट](../../../../../../../../../../../open_prompt_builder) से सर्वर का परीक्षण करें। सर्वर अपने आप Agent Builder से जुड़ जाएगा।<br>3. प्रॉम्प्ट के साथ सर्वर का परीक्षण करने के लिए `Run` पर क्लिक करें। |
| MCP Inspector | MCP Inspector का उपयोग करके MCP सर्वर का डीबग करें। | 1. [Node.js](https://nodejs.org/) इंस्टॉल करें<br> 2. Inspector सेटअप करें: `cd inspector` && `npm install` <br> 3. VS Code Debug पैनल खोलें। `Debug SSE in Inspector (Edge)` या `Debug SSE in Inspector (Chrome)` चुनें। डीबगिंग शुरू करने के लिए `F5` दबाएँ।<br> 4. जब MCP Inspector ब्राउज़र में लॉन्च हो, तो MCP सर्वर को जोड़ने के लिए `Connect` बटन पर क्लिक करें।<br> 5. फिर आप `List Tools` कर सकते हैं, एक टूल चुन सकते हैं, पैरामीटर इनपुट कर सकते हैं, और `Run Tool` से अपने सर्वर कोड का डीबग कर सकते हैं।<br> |

## डिफ़ॉल्ट पोर्ट और कस्टमाइज़ेशन

| डीबग मोड | पोर्ट | परिभाषाएँ | कस्टमाइज़ेशन | नोट |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | उपरोक्त पोर्ट बदलने के लिए [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) संपादित करें। | लागू नहीं |
| MCP Inspector | 3001 (सर्वर); 5173 और 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | उपरोक्त पोर्ट बदलने के लिए [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) संपादित करें।| लागू नहीं |

## सुझाव

यदि आपके पास इस टेम्पलेट के लिए कोई प्रतिक्रिया या सुझाव है, तो कृपया [AI Toolkit GitHub रिपॉजिटरी](https://github.com/microsoft/vscode-ai-toolkit/issues) पर एक इश्यू खोलें।

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
इस दस्तावेज़ का अनुवाद AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) का उपयोग करके किया गया है। जबकि हम सटीकता के लिए प्रयास करते हैं, कृपया ध्यान दें कि स्वचालित अनुवादों में त्रुटियाँ या अशुद्धियाँ हो सकती हैं। मूल दस्तावेज़ अपनी मूल भाषा में प्रामाणिक स्रोत माना जाना चाहिए। महत्वपूर्ण जानकारी के लिए, पेशेवर मानव अनुवाद की सिफारिश की जाती है। इस अनुवाद के उपयोग से उत्पन्न किसी भी गलतफहमी या गलत व्याख्या के लिए हम ज़िम्मेदार नहीं हैं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->