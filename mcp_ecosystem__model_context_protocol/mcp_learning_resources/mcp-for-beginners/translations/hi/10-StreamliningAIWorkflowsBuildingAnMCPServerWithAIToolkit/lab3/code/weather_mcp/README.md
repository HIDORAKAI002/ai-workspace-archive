# वेदर MCP सर्वर

यह एक Python में नमूना MCP सर्वर है जो मौसम उपकरणों को नकली प्रतिक्रियाओं के साथ लागू करता है। इसे आपके अपने MCP सर्वर के लिए एक आधारचित्र के रूप में उपयोग किया जा सकता है। इसमें निम्नलिखित विशेषताएं शामिल हैं:

- **मौसम उपकरण**: एक उपकरण जो दिए गए स्थान के आधार पर नकली मौसम जानकारी प्रदान करता है।
- **एजेंट बिल्डर से कनेक्ट करें**: एक फीचर जो आपको परीक्षण और डिबगिंग के लिए MCP सर्वर को एजेंट बिल्डर से जोड़ने की अनुमति देता है।
- **[MCP इंस्पेक्टर](https://github.com/modelcontextprotocol/inspector) में डिबग करें**: एक फीचर जो आपको MCP सर्वर को MCP इंस्पेक्टर का उपयोग करके डिबग करने की सुविधा देता है।

## Weather MCP सर्वर टेम्पलेट के साथ शुरू करें

> **पूर्वापेक्षाएँ**
>
> अपने स्थानीय विकास मशीन पर MCP सर्वर चलाने के लिए, आपको चाहिए होगा:
>
> - [Python](https://www.python.org/)
> - (*वैकल्पिक - यदि आप uv पसंद करते हैं*) [uv](https://github.com/astral-sh/uv)
> - [Python डिबगर एक्सटेंशन](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## पर्यावरण तैयार करें

इस परियोजना के लिए पर्यावरण सेटअप करने के दो तरीके हैं। आप अपनी पसंद के अनुसार किसी एक को चुन सकते हैं।

> नोट: वर्चुअल वातावरण बनाने के बाद सुनिश्चित करें कि VSCode या टर्मिनल को पुनः लोड करें ताकि वर्चुअल वातावरण python का उपयोग हो।

| तरीका | कदम |
| -------- | ----- |
| `uv` का उपयोग करना | 1. वर्चुअल वातावरण बनाएं: `uv venv` <br>2. VSCode कमांड "***Python: Select Interpreter***" चलाएं और बनाए गए वर्चुअल वातावरण से python चुनें <br>3. निर्भरता (डेव निर्भरता सहित) स्थापित करें: `uv pip install -r pyproject.toml --extra dev` |
| `pip` का उपयोग करना | 1. वर्चुअल वातावरण बनाएं: `python -m venv .venv` <br>2. VSCode कमांड "***Python: Select Interpreter***" चलाएं और बनाए गए वर्चुअल वातावरण से python चुनें<br>3. निर्भरता (डेव निर्भरता सहित) स्थापित करें: `pip install -e .[dev]` |

पर्यावरण सेटअप के बाद, आप एजेंट बिल्डर के माध्यम से MCP क्लाइंट के रूप में अपने स्थानीय विकास मशीन में सर्वर चला सकते हैं:
1. VS Code डिबग पैनल खोलें। `Debug in Agent Builder` चुनें या MCP सर्वर डिबगिंग शुरू करने के लिए `F5` दबाएं।
2. AI Toolkit एजेंट बिल्डर का उपयोग करके [इस प्रॉम्प्ट](../../../../../../../../../../../open_prompt_builder) के साथ सर्वर का परीक्षण करें। सर्वर स्वतः एजेंट बिल्डर से जुड़ जाएगा।
3. प्रॉम्प्ट के साथ सर्वर का परीक्षण करने के लिए `Run` पर क्लिक करें।

**बधाई हो**! आपने सफलतापूर्वक एजेंट बिल्डर के माध्यम से MCP क्लाइंट के रूप में अपने स्थानीय विकास मशीन में Weather MCP सर्वर चलाया है।
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## टेम्पलेट में क्या शामिल है

| फ़ोल्डर / फ़ाइल| सामग्री                                   |
| ------------ | -------------------------------------------- |
| `.vscode`    | डिबगिंग के लिए VSCode फ़ाइलें                 |
| `.aitk`      | AI Toolkit के लिए विन्यास                    |
| `src`        | वेदर MCP सर्वर के लिए स्रोत कोड             |

## Weather MCP सर्वर को डिबग कैसे करें

> नोट्स:
> - [MCP इंस्पेक्टर](https://github.com/modelcontextprotocol/inspector) MCP सर्वरों का परीक्षण और डिबगिंग करने के लिए एक दृश्य विकास उपकरण है।
> - सभी डिबगिंग मोड ब्रेकपॉइंट्स का समर्थन करते हैं, इसलिए आप टूल कार्यान्वयन कोड में ब्रेकपॉइंट्स जोड़ सकते हैं।

| डिबग मोड | विवरण | डिबग करने के कदम |
| ---------- | ----------- | --------------- |
| एजेंट बिल्डर | AI Toolkit के माध्यम से एजेंट बिल्डर में MCP सर्वर को डिबग करें। | 1. VS Code डिबग पैनल खोलें। `Debug in Agent Builder` चुनें और MCP सर्वर डिबगिंग शुरू करने के लिए `F5` दबाएं।<br>2. AI Toolkit एजेंट बिल्डर का उपयोग करके [इस प्रॉम्प्ट](../../../../../../../../../../../open_prompt_builder) के साथ सर्वर का परीक्षण करें। सर्वर स्वतः एजेंट बिल्डर से जुड़ जाएगा।<br>3. प्रॉम्प्ट के साथ सर्वर का परीक्षण करने के लिए `Run` पर क्लिक करें। |
| MCP इंस्पेक्टर | MCP इंस्पेक्टर का उपयोग करके MCP सर्वर को डिबग करें। | 1. [Node.js](https://nodejs.org/) इंस्टॉल करें<br> 2. इंस्पेक्टर सेट करें: `cd inspector` && `npm install` <br> 3. VS Code डिबग पैनल खोलें। `Debug SSE in Inspector (Edge)` या `Debug SSE in Inspector (Chrome)` चुनें। डिबग शुरू करने के लिए `F5` दबाएं।<br> 4. जब MCP इंस्पेक्टर ब्राउज़र में लॉन्च हो, तो इस MCP सर्वर से कनेक्ट करने के लिए `Connect` बटन पर क्लिक करें।<br> 5. फिर आप `List Tools` कर सकते हैं, किसी टूल का चयन करें, पैरामीटर इनपुट करें, और अपने सर्वर कोड को डिबग करने के लिए `Run Tool` पर क्लिक करें।<br> |

## डिफ़ॉल्ट पोर्ट्स और अनुकूलन

| डिबग मोड | पोर्ट्स | परिभाषाएं | अनुकूलन | नोट |
| ---------- | ----- | ------------ | -------------- |-------------- |
| एजेंट बिल्डर | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | ऊपर दिए गए पोर्ट्स को बदलने के लिए [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) संपादित करें। | लागू नहीं |
| MCP इंस्पेक्टर | 3001 (सर्वर); 5173 और 3000 (इंस्पेक्टर) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | ऊपर दिए गए पोर्ट्स को बदलने के लिए [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) संपादित करें। | लागू नहीं |

## प्रतिक्रिया

यदि आपके पास इस टेम्पलेट के लिए कोई प्रतिक्रिया या सुझाव हैं, तो कृपया [AI Toolkit GitHub संग्रह](https://github.com/microsoft/vscode-ai-toolkit/issues) पर एक मुद्दा खोलें।

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
यह दस्तावेज़ एआई अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) का उपयोग करके अनुवादित किया गया है। जबकि हम सटीकता के लिए प्रयासरत हैं, कृपया ध्यान दें कि स्वचालित अनुवादों में त्रुटियाँ या असंगतियां हो सकती हैं। मूल भाषा में मौलिक दस्तावेज़ ही प्राधिकार स्रोत माना जाना चाहिए। महत्वपूर्ण सूचनाओं के लिए, पेशेवर मानव अनुवाद की सलाह दी जाती है। इस अनुवाद के उपयोग से उत्पन्न किसी भी गलतफ़हमी या गलत व्याख्या के लिए हम उत्तरदायी नहीं हैं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->