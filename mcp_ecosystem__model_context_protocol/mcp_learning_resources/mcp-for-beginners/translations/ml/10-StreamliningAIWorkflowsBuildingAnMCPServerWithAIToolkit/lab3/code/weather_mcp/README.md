# കാലാവസ്ഥ MCP സർവർ

കൃത്രിമ പ്രതികരണങ്ങളോടുകൂടിയ കാലാവസ്ഥാ ഉപകരണങ്ങൾ പിന്തുടരുന്ന Python ലെ ഒരു സാമ്പിൾ MCP സർവർ ആണ് ഇത്. ഇത് നിങ്ങളുടെ സ്വന്തം MCP സർവറിനുള്ള ഞാൻ scaffolding ആയി ഉപയോഗിക്കാനാണ്. ഇതിൽ താഴെപ്പറയുന്ന സവിശേഷതകൾ ഉൾപ്പെടുന്നു:

- **കാലാവസ്ഥാ ഉപകരണം**: നൽകിയ സ്ഥലത്തിന്റെ അടിസ്ഥാനത്തിൽ കൃത്രിമകാലാവസ്ഥാ വിവരങ്ങൾ നൽകുന്ന ഒരു ഉപകരണം.
- **എജന്റ് ബിൽഡറുമായി ബന്ധിപ്പിക്കുക**: ടെസ്റ്റിങ്ങിനും ഡീബഗിംഗിനും MCP സർവറെ എജന്റ്ബിൽഡറുമായി ബന്ധിപ്പിക്കാൻ അനുവദിക്കുന്ന ഒരു സവിശേഷത.
- **[MCP ഇൻസ്‌പെക്റ്ററിൽ](https://github.com/modelcontextprotocol/inspector) ഡീബഗ് ചെയ്യുക**: MCP ഇൻസ്‌പെക്റ്റർ ഉപയോഗിച്ച് MCP സർവർ ഡീബഗിംഗിന് അനുവദിക്കുന്ന ഒരു സവിശേഷത.

## കാലാവസ്ഥ MCP സർവർ ടെംപ്ലേറ്റുമായി തുടങ്ങുക

> **പ്രാഥമിക ആവശ്യങ്ങൾ**
>
> നിങ്ങളുടെ ലോക്കൽ ഡെവ് മെഷീനിൽ MCP സർവർ പ്രവർത്തിപ്പിക്കാൻ വേണ്ടതാണ്:
>
> - [Python](https://www.python.org/)
> - (*ഐച്ഛികം - നിങ്ങൾ uv ഇഷ്ടപ്പെടുകയാണെങ്കിൽ*) [uv](https://github.com/astral-sh/uv)
> - [Python ഡീബഗർ എക്സ്റ്റൻഷൻ](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## പരിസ്ഥിതി ഒരുക്കുക

ഈ പ്രൊജക്റ്റിനുള്ള പരിസ്ഥിതിയെ രണ്ട് വഴികളിലൂടെ സജ്ജമാക്കാവുന്നതാണ്. നിങ്ങളുടെ ഇഷ്ടാനുസരണം ഏതെങ്കിലും ഒരു വഴി തിരഞ്ഞെടുക്കാം.

> കുറിപ്പ്: വേർച്വൽ പരിസ്ഥിതി സൃഷ്ടിച്ചതിന് ശേഷം പൈത്തൺ ഉപയോഗിക്കാൻ VSCode അല്ലെങ്കിൽ ടെർമിനൽ റീലോഡ് ചെയ്യുക.

| വഴി | ഘട്ടങ്ങൾ |
| -------- | ----- |
| `uv` ഉപയോഗിച്ച് | 1. വേർച്വൽ പരിസ്ഥിതി സൃഷ്ടിക്കുക: `uv venv` <br>2. VSCode കമാൻഡ് "***Python: Select Interpreter***" ഓടച്ച് സൃഷ്ടിച്ച വേർച്വൽ പരിസ്ഥിതിയിലെ പൈത്തൺ തിരഞ്ഞെടുക്കുക <br>3. ആശ്രിതങ്ങൾ ഇൻസ്റ്റാൾ ചെയ്യുക (ഡെവ് ആശ്രിതങ്ങൾ ഉൾപ്പെടെ): `uv pip install -r pyproject.toml --extra dev` |
| `pip` ഉപയോഗിച്ച് | 1. വേർച്വൽ പരിസ്ഥിതി സൃഷ്ടിക്കുക: `python -m venv .venv` <br>2. VSCode കമാൻഡ് "***Python: Select Interpreter***" ഓടിച്ച് സൃഷ്ടിച്ച വേർച്വൽ പരിസ്ഥിതിയിലെ പൈത്തൺ തിരഞ്ഞെടുക്കുക<br>3. ആശ്രിതങ്ങൾ ഇൻസ്റ്റാൾ ചെയ്യുക (ഡെവ് ആശ്രിതങ്ങൾ ഉൾപ്പെടെ): `pip install -e .[dev]` | 

പരിസ്ഥിതി സജ്ജമാക്കിയതിന് ശേഷം, Agent Builder മുഖാന്തിരം MCP ക്ലയന്റ് ആയി നിങ്ങളുടെ ലോക്കൽ ഡെവ് മെഷീനിൽ സർവർ ഓടിക്കാം:
1. VS Code ഡീബഗ് പാനൽ തുറക്കുക. `Debug in Agent Builder` തിരഞ്ഞെടുക്കുക അല്ലെങ്കിൽ `F5` അമർത്തി MCP സർവർ ഡീബഗിംഗ് ആരംഭിക്കുക.
2. Microsoft Foundry Toolkit Agent Builder ഉപയോഗിച്ച് [ഈ പ്രോംപ്റ്റ്](../../../../../../../../../../../open_prompt_builder) ഉപയോഗിച്ച് സർവർ പരിശോധിക്കുക. സർവർ സ്വയം എജന്റ് ബിൽഡറുമായി ബന്ധിപ്പിക്കും.
3. `Run` ക്ലിക്ക് ചെയ്ത് പ്രോംപ്റ്റുമായി സർവർ ടെസ്റ്റ് ചെയ്യുക.

**അഭിനന്ദനങ്ങൾ**! നിങ്ങൾ വിജയകരമായി Agent Builder വഴിയാണ് MCP ക്ലയന്റ് ആയി നിങ്ങളുടെ ലോക്കൽ ഡെവ് മെഷീനിൽ കാലാവസ്ഥ MCP സർവർ ഓടിച്ചത്.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## ടെംപ്ലേറ്റിൽ ഉൾപ്പെടുത്തിയിരിക്കുന്നത്

| ഫോള്ഡർ / ഫയൽ| ഉള്ളടക്കം                                      |
| ------------ | -------------------------------------------- |
| `.vscode`    | ഡീബഗിംഗിനുള്ള VSCode ഫയലുകൾ                 |
| `.aitk`      | Microsoft Foundry Toolkit നുള്ള ക്രമീകരണങ്ങൾ    |
| `src`        | കാലാവസ്ഥ MCP സർവറിനുള്ള സോഴ്‌സ് കോഡ്           |

## കാലാവസ്ഥ MCP സർവർ എങ്ങനെ ഡീബഗ് ചെയ്യാം

> കുറിപ്പുകൾ:
> - [MCP ഇൻസ്‌പെക്റ്റർ](https://github.com/modelcontextprotocol/inspector) MCP സർവറുകൾ ടെസ്റ്റ് ചെയ്യാനും ഡീബഗ് ചെയ്യാനുമുള്ള ദൃശ്യ ഡെവലപ്പർ ഉപകരണം ആണ്.
> - എല്ലാ ഡീബഗ് മോഡുകളും ബ്രേക്ക്‌പോയിന്റുകൾ പിന്തുണയ്ക്കുന്നു, അതുകൊണ്ട് ഉപകരണത്തിന്റെ പൂർത്തിയാക്കിയ കോഡിൽ ബ്രേക്ക്‌പോയിന്റുകൾ ചേർക്കാം.

| ഡീബഗ് മോഡ് | വിവരണം | ഡീബഗ് ചെയ്യാനുള്ള ഘട്ടങ്ങൾ |
| ---------- | ----------- | --------------- |
| എജന്റ് ബിൽഡർ | Microsoft Foundry Toolkit വഴി MCP സർവർ എജന്റ് ബിൽഡറിൽ ഡീബഗ് ചെയ്യുക. | 1. VS Code ഡീബഗ് പാനൽ തുറക്കുക. `Debug in Agent Builder` തിരഞ്ഞെടുക്കുകയും `F5` അമർത്തി MCP സർവർ ഡീബഗിംഗ് തുടങ്ങുക.<br>2. Microsoft Foundry Toolkit Agent Builder ഉപയോഗിച്ച് [ഈ പ്രോംപ്റ്റ്](../../../../../../../../../../../open_prompt_builder) ഉപയോഗിച്ച് സർവർ ടെസ്‌റ്റ് ചെയ്യുക. MCP സർവർ സ്വയം എജന്റ് ബിൽഡറുമായി ബന്ധിപ്പിക്കും.<br>3. `Run` ക്ലിക്ക് ചെയ്തു പ്രോംപ്റ്റ് ഉപയോഗിച്ച് സർവർ പരിശോധിക്കുക. |
| MCP ഇൻസ്‌പെക്റ്റർ | MCP ഇൻസ്‌പെക്റ്റർ ഉപയോഗിച്ച് MCP സർവർ ഡീബഗ് ചെയ്യുക. | 1. [Node.js](https://nodejs.org/) ഇൻസ്റ്റാൾ ചെയ്യുക<br> 2. ഇൻസ്‌പെക്റ്റർ സജ്ജമാക്കുക: `cd inspector` && `npm install` <br> 3. VS Code ഡീബഗ് പാനൽ തുറക്കുക. `Debug SSE in Inspector (Edge)` അല്ലെങ്കിൽ `Debug SSE in Inspector (Chrome)` തിരഞ്ഞെടുക്കുക. F5 അമർത്തി ഡീബഗിംഗ് തുടങ്ങുക.<br> 4. MCP ഇൻസ്‌പെക്റ്റർ ബ്രൗസറിൽ തുടങ്ങി കഴിഞ്ഞാൽ, `Connect` ബട്ടൺ ക്ലിക്ക് ചെയ്ത് ഈ MCP സർവറെ ബന്ധിപ്പിക്കുക.<br> 5. തുടർന്ന് `List Tools` ചെയ്യാം, ഒരു ഉപകരണം തിരഞ്ഞെടുക്കാം, പാരാമീറ്ററുകൾ നൽകാം, പിന്നെ `Run Tool` വഴി നിങ്ങളുടെ സർവർ കോഡ് ഡീബഗ് ചെയ്യാം.<br> |

## ഡിഫോൾട്ട് പോർട്ടുകളും ക്രമീകരണങ്ങളും

| ഡീബഗ് മോഡ് | പോർട്ടുകൾ | നിർവചനങ്ങൾ | ക്രമീകരണങ്ങൾ | കുറിപ്പ് |
| ---------- | ----- | ------------ | -------------- |-------------- |
| എജന്റ് ബിൽഡർ | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) എഡിറ്റ് ചെയ്ത് പോർട്ടുകൾ മാറ്റാം. | ബാധകമല്ല |
| MCP ഇൻസ്‌പെക്റ്റർ | 3001 (സർവർ); 5173, 3000 (ഇൻസ്‌പെക്റ്റർ) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) എഡിറ്റ് ചെയ്ത് പോർട്ടുകൾ മാറ്റാം.| ബാധകമല്ല |

## പ്രതികരണം

ഈ ടെംപ്ലേറ്റിനായി നിങ്ങളുടെ അഭിപ്രായങ്ങൾ അല്ലെങ്കിൽ നിർദ്ദേശങ്ങൾ ഉണ്ടെങ്കിൽ, ദയവായി [Microsoft Foundry Toolkit GitHub റിപ്പോസിറ്ററിയിൽ](https://github.com/microsoft/vscode-ai-toolkit/issues) ഒരു ഇഷ്യൂ തുറക്കുക.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**അറിയിപ്പ്**:
ഈ രേഖ AI പരിഭാഷാ സേവനം [Co-op Translator](https://github.com/Azure/co-op-translator) ഉപയോഗിച്ച് പരിഭാഷപ്പെടുത്തിയതാണ്. ഞങ്ങൾ കൃത്യതയ്ക്കായി ശ്രമിക്കുന്നുവെങ്കിലും, ഓട്ടോമേറ്റഡ് പരിഭാഷകളിൽ പിഴവുകൾ അല്ലെങ്കിൽ തെറ്റായ വിവരങ്ങൾ ഉണ്ടാകാൻ സാധ്യതയുണ്ട്. അതിന്റെ സ്വാഭാവിക ഭാഷയിലുള്ള അസൽ രേഖയാണ് പ്രാമാണികമായ ഉറവിടമായി പരിഗണിക്കേണ്ടത്. നിർണായകമായ വിവരങ്ങൾക്ക്, പ്രൊഫഷണൽ മനുഷ്യ പരിഭാഷ ശുപാർശ ചെയ്യുന്നു. ഈ പരിഭാഷ ഉപയോഗിച്ച് ഉണ്ടാകുന്ന തെറ്റിദ്ധാരണകൾ അല്ലെങ്കിൽ തെറ്റായ വ്യാഖ്യാനങ്ങൾക്കായി ഞങ്ങൾ ഉത്തരവാദികളല്ല.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->