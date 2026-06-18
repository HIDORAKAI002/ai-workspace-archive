# Weather MCP Server

នេះគឺជាសេវាផ្នែកមួយ MCP Server នៅក្នុង Python ដែលអនុវត្តឧបករណ៍អាកាសធាតុជាមួយនឹងចម្លើយប្លែកៗ។ វាអាចត្រូវបានប្រើជាចម្លើយសម្រាប់ MCP Server របស់អ្នកផ្ទាល់។ វារួមបញ្ចូលលក្ខណៈខាងក្រោម៖

- **ឧបករណ៍អាកាសធាតុ**៖ ឧបករណ៍ដែលផ្តល់ព័ត៌មានអាកាសធាតុប្លែកៗដោយផ្អែកលើទីតាំងដែលបានផ្ដល់។
- **ភ្ជាប់ទៅកាន់ Agent Builder**៖ លក្ខណៈមួយដែលអនុញ្ញាតឱ្យអ្នកភ្ជាប់ MCP server ទៅកាន់ Agent Builder សម្រាប់ការធ្វើតេស្ត និងបំបាត់កំហុស។
- **បំបាត់កំហុសនៅ [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**៖ លក្ខណៈមួយដែលអនុញ្ញាតឱ្យអ្នកបំបាត់កំហុស MCP Server ដោយប្រើ MCP Inspector។

## ចាប់ផ្ដើមជាមួយទម្រង់ Weather MCP Server

> **ដំណើរការមុន**
> 
> ដើម្បីដំណើរការ MCP Server នៅលើម៉ាស៊ីនអភិវឌ្ឍន៍ក្នុងស្រុករបស់អ្នក អ្នកនឹងត្រូវការ៖
> 
> - [Python](https://www.python.org/)
> - (*ជម្រើស - ប្រសិនបើអ្នកចូលចិត្ត uv*) [uv](https://github.com/astral-sh/uv)
> - [ការរីកចម្រើន Python Debugger Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## រៀបចំបរិយាកាស

មានពីរទ្រឹស្តីក្នុងការរៀបចំបរិយាកាសសម្រាប់គម្រោងនេះ។ អ្នកអាចជ្រើសរើសត្រឹមត្រូវតាមចំណង់ចំណូលចិត្តរបស់អ្នក។

> សម្គាល់៖ ឡូដ VSCode ឬ terminal ថ្មីដើម្បីប្រាកដថា python នៅក្នុងបរិយាកាស virtual ត្រូវបានប្រើបន្ទាប់ពីបង្កើតបរិយាកាស virtual។

| ទ្រឹស្តី | ជំហាន |
| -------- | ------ |
| ប្រើ `uv` | 1. បង្កើតបរិយាកាស virtual៖ `uv venv` <br>2. បើក VSCode Command "***Python: Select Interpreter***" ហើយជ្រើស python ពីបរិយាកាស virtual ដែលបានបង្កើត<br>3. ដំឡើងបណ្ដុំឧបករណ៍ (រួមមាន dev dependencies): `uv pip install -r pyproject.toml --extra dev` |
| ប្រើ `pip` | 1. បង្កើតបរិយាកាស virtual៖ `python -m venv .venv` <br>2. បើក VSCode Command "***Python: Select Interpreter***" ហើយជ្រើស python ពីបរិយាកាស virtual ដែលបានបង្កើត<br>3. ដំឡើងបណ្ដុំឧបករណ៍ (រួមមាន dev dependencies): `pip install -e .[dev]` |

បន្ទាប់ពីរៀបចំព្រឹត្តិការណ៍ស្នូលរួច អ្នកអាចដំណើរការ ម៉ាស៊ីនបម្រើ នៅលើម៉ាស៊ីនអភិវឌ្ឍន៍ក្នុងស្រុក តាមរយៈ Agent Builder ជា MCP Client ដើម្បីចាប់ផ្ដើម៖
1. បើកផ្ទាំង Debug VS Code។ ជ្រើស `Debug in Agent Builder` ឬចុច `F5` ដើម្បីចាប់ផ្តើមបំបាត់កំហុសម៉ាស៊ីនបម្រើ។
2. ប្រើ Microsoft Foundry Toolkit Agent Builder ដើម្បីសាកល្បងម៉ាស៊ីនបម្រើជាមួយ [คำสั่งនេះ](../../../../../../../../../../../open_prompt_builder)។ ម៉ាស៊ីនបម្រើនឹងភ្ជាប់ដោយស្វ័យប្រវត្តិទៅ Agent Builder។
3. ចុច `Run` ដើម្បីសាកល្បងម៉ាស៊ីនបម្រុងជាមួយคำสั่ง។

**អបអរសាទរ**! អ្នកបានដំណើរការ MCP Server អាកាសធាតុដោយជោគជ័យនៅលើម៉ាស៊ីនអភិវឌ្ឍន៍ក្នុងស្រុករបស់អ្នក តាម Agent Builder ជា MCP Client។
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## មានអ្វីក្នុងទម្រង់នេះ

| ថត / ឯកសារ | មាតិកា                                     |
| ------------ | -------------------------------------------- |
| `.vscode`    | ឯកសារ VSCode សម្រាប់បំបាត់កំហុស                  |
| `.aitk`      | ការកំណត់សម្រាប់ Microsoft Foundry Toolkit                |
| `src`        | កូដប្រភពសម្រាប់ម៉ាស៊ីនបម្រើ mcp អាកាសធាតុ           |

## របៀបបំបាត់កំហុស Weather MCP Server

> សម្គាល់៖
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) គឺជាឧបករណ៍អភិវឌ្ឍន៍ទស្សនៈ សម្រាប់សាកល្បង និងបំបាត់កំហុស MCP servers។
> - របៀបបំបាត់កំហុសទាំងអស់គាំទ្រចំណុចបំបែក ដូច្នេះ អ្នកអាចបន្ថែមចំណុចបំបែកទៅកូដអនុវត្តឧបករណ៍។

| របៀបបំបាត់កំហុស | សេចក្តីរៀបរាប់ | ជំហានក្នុងការបំបាត់កំហុស |
| ---------- | ----------- | --------------- |
| Agent Builder | បំបាត់កំហុស MCP Server ក្នុង Agent Builder តាម Microsoft Foundry Toolkit។ | 1. បើកផ្ទាំង Debug VS Code។ ជ្រើស `Debug in Agent Builder` ហើយចុច `F5` ដើម្បីចាប់ផ្តើមបំបាត់កំហុស MCP Server។<br>2. ប្រើ Microsoft Foundry Toolkit Agent Builder ដើម្បីសាកល្បងម៉ាស៊ីនបម្រើជាមួយ [คำสั่งនេះ](../../../../../../../../../../../open_prompt_builder)។ ម៉ាស៊ីនបម្រើនឹងភ្ជាប់ដោយស្វ័យប្រវត្តិទៅ Agent Builder។<br>3. ចុច `Run` ដើម្បីសាកល្បងម៉ាស៊ីនបម្រើជាមួយคำสั่ง។ |
| MCP Inspector | បំបាត់កំហុស MCP Server ដោយប្រើ MCP Inspector។ | 1. ដំឡើង [Node.js](https://nodejs.org/)<br>2. រៀបចំ Inspector៖ `cd inspector` && `npm install` <br> 3. បើកផ្ទាំង Debug VS Code។ ជ្រើស `Debug SSE in Inspector (Edge)` ឬ `Debug SSE in Inspector (Chrome)`។ ចុច F5 ដើម្បីចាប់ផ្តើមបំបាត់កំហុស។<br>4. ពេល MCP Inspector បើកនៅក្នុងកម្មវិធីរុករក ចុចប៊ូតុង `Connect` ដើម្បីភ្ជាប់ MCP Server នេះ។<br>5. បន្ទាប់មក អ្នកអាច `List Tools` ជ្រើសឧបករណ៍ បញ្ចូលប៉ារាម៉ែត្រ ហើយ `Run Tool` ដើម្បីបំបាត់កំហុសកូដម៉ាស៊ីនបម្រើរបស់អ្នក។<br> |

## កំព្យួរដើម និង ការប្តូរតាមចិត្ត

| របៀបបំបាត់កំហុស | កំព្យួរ | ការពណ៌នា | ការប្តូរតាមចិត្ត | សម្គាល់ |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | កែប្រែ [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) ដើម្បីប្ដូរកំព្យួរខាងលើ។ | មិនមាន |
| MCP Inspector | 3001 (ម៉ាស៊ីនបម្រើ); 5173 និង 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | កែប្រែ [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) ដើម្បីប្ដូរកំព្យួរខាងលើ។ | មិនមាន |

## មតិយោបល់

បើអ្នកមានមតិបន្ថែម ឬដាក់ស្នើសម្រាប់ទម្រង់នេះ សូមបើកប្រធានបទនៅលើ [Microsoft Foundry Toolkit GitHub repository](https://github.com/microsoft/vscode-ai-toolkit/issues)។

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ការបដិសេធ**:
ឯកសារនេះត្រូវបានបម្លែងភាសា ដោយប្រើសេវាបម្លែងភាសា AI [Co-op Translator](https://github.com/Azure/co-op-translator)។ ទោះយើងខ្ញុំមានក្តីប្រាថ្នាឱ្យបានច្បាស់លាស់ តែសូមយល់ដឹងថាការបម្លែងដោយស្វ័យប្រវត្តិក៏អាចមានកំហុសឬភាពមិនត្រឹមត្រូវ។ ឯកសារដើមជាភាសាទីតាំងគួរត្រូវបានគេប្រើជាប្រភពច្បាស់លាស់។ សម្រាប់ព័ត៌មានសំខាន់ៗ សូមណែនាំឱ្យប្រើប្រាស់ការប្រែដោយមនុស្សជំនាញ។ យើងខ្ញុំមិនទទួលខុសត្រូវចំពោះការយល់ច្រឡំ ឬការបកស្រាយខុសបន្ទាប់ពីការប្រើប្រាស់ការបម្លែងនេះនោះទេ។
<!-- CO-OP TRANSLATOR DISCLAIMER END -->