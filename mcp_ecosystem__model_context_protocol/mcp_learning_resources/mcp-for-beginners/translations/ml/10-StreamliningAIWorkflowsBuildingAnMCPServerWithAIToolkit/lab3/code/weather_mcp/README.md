# കാലാവസ്ഥ MCP സെർവർ

കാലാവസ്ഥാ ടൂൾസ് മോക് റസ്പോൺസുകളോടുകൂടി നടപ്പിലാക്കുന്ന പൈറ്റൺ MCP സർവറിന്റെ ഒരു സാമ്പിൾ ഇത്. നിങ്ങളുടെ സ്വന്തം MCP സർവർക്ക് സ്‌കാഫോൾഡായി ഇത് ഉപയോഗിക്കാം. ഇതിൽ താഴെപ്പറഞ്ഞ പ്രത്യേകതകൾ ഉൾക്കൊള്ളുന്നു:

- **കാലാവസ്ഥ ടൂൾ**: നൽകിയ സ്ഥലത്തെ അടിസ്ഥാനമാക്കി മോക് ചെയ്ത കാലാവസ്ഥാ വിവരം നൽകുന്ന ഒരു ടൂൾ.
- **ഏജന്റ് ബിൽഡറുമായി കണക്ട് ചെയ്യുക**: ടെസ്റ്റിംഗിനും ഡീബഗ് ചെയ്യുന്നതിനുമായി MCP സർവറെ ഏജന്റ് ബിൽഡറുമായി കണക്ട് ചെയ്യാനുള്ള സംവിധാനം.
- **[MCP ഇൻസ്‌പെക്ടറിൽ](https://github.com/modelcontextprotocol/inspector) ഡീബഗ് ചെയ്യുക**: MCP ഇൻസ്‌പെക്ടർ ഉപയോഗിച്ച് MCP സർവർ ഡീബഗ് ചെയ്യാനുള്ള സംവിധാനം.

## കാലാവസ്ഥ MCP സെർവർ ടെംപ്ലേറ്റ് ഉപയോഗിച്ച് തുടങ്ങാം

> **അവശ്യകാര്യങ്ങൾ**
>
> നിങ്ങളുടെ ലോക്കൽ ഡെവ് മെഷീനിൽ MCP സർവർ ഓടിക്കാനായി, നിങ്ങള്ക്ക് ആവശ്യമായവ:
>
> - [Python](https://www.python.org/)
> - (*ഐച്ഛികം - uv ആണ് നിങ്ങൾക്ക് ഇഷ്ടം എങ്കിൽ*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## പരിസരം തയ്യാറാക്കുക

ഈ പ്രોજക്റ്റിന്റെ പരിസരം സജ്ജമാക്കാൻ രണ്ടു സമീപനങ്ങളുണ്ട്. നിങ്ങളുടെ ഇഷ്ടാനുസരണം ഏതെങ്കിലും ഒരു തെരഞ്ഞെടുക്കാം.

> заметка: വിർച്ച്വൽ പരിസരം സൃഷ്‌ടിക്കാനായി ശേഷം VSCode അല്ലെങ്കിൽ ടർമിനൽ റീലോഡ് ചെയ്ത് വിർച്ച്വൽ പരിസരം പൈതൺ ഉപയോഗിക്കുന്നതായി ഉറപ്പുവരുത്തുക.

| സമീപനം | ഘട്ടങ്ങൾ |
| -------- | -------- |
| `uv` ഉപയോഗിച്ച് | 1. വിർച്ച്വൽ പരിസരം സൃഷ്ടിക്കുക: `uv venv` <br>2. VSCode കമാൻഡ് "***Python: Select Interpreter***" പ്രവർത്തിപ്പിച്ച് സൃഷ്ടിച്ച വിർച്ച്വൽ പരിസരത്തിലെ പൈതൺ തിരഞ്ഞെടുക്കുക <br>3. ആവശ്യങ്ങളായ ഡിപ്പൻഡൻസികൾ ഇൻസ്റ്റാൾ ചെയ്യുക (ഡെവ് ഡിപ്പൻഡൻസികൾ ഉൾപ്പെടെ): `uv pip install -r pyproject.toml --extra dev` |
| `pip` ഉപയോഗിച്ച് | 1. വിർച്ച്വൽ പരിസരം സൃഷ്ടിക്കുക: `python -m venv .venv` <br>2. VSCode കമാൻഡ് "***Python: Select Interpreter***" പ്രവർത്തിപ്പിച്ച് സൃഷ്ടിച്ച വിർച്ച്വൽ പരിസരത്തിലെ പൈതൺ തിരഞ്ഞെടുക്കുക<br>3. ആവശ്യങ്ങളായ ഡിപ്പൻഡൻസികൾ ഇൻസ്റ്റാൾ ചെയ്യുക (ഡെവ് ഡിപ്പൻഡൻസികൾ ഉൾപ്പെടെ): `pip install -e .[dev]` | 

പരിസ്ഥിതി സജ്ജീകരിച്ചതിനു ശേഷം, MCP ക്ലയന്റ് ആയി ഏജന്റ് ബിൽഡർ ഉപയോഗിച്ച് നിങ്ങളുടെ ലോക്കൽ ഡെവ് മെഷീനിൽ സെർവർ ഓടിക്കാം:
1. VS Code ഡീബഗ് പാനൽ തുറക്കുക. `Debug in Agent Builder` തിരഞ്ഞെടുത്ത് `F5` അമർത്തി MCP സർവർ ഡീബഗ് ആരംഭിക്കുക.
2. AI Toolkit Agent Builder ഉപയോഗിച്ച് [ഈ പ്രോംപ്റ്റ്](../../../../../../../../../../../open_prompt_builder) ഉപയോഗിച്ച് സെർവർ പരീക്ഷിക്കുക. സെർവർ സ്വയം ഏജന്റ് ബിൽഡറുമായി ബന്ധപ്പെടും.
3. പ്രോംപ്റ്റിൽ `Run` ക്ലിക്ക് ചെയ്ത് സെർവർ ടെസ്റ്റ് ചെയ്യുക.

**അഭിനന്ദനങ്ങൾ**! ഏജന്റ് ബിൽഡറുമായി MCP ക്ലയന്റ് ആയി നിങ്ങളുടെ ലൊക്കൽ ഡെവ് മെഷീനിൽ കാലാവസ്ഥ MCP സർവർ വിജയകരമായി പ്രവർത്തിപ്പിച്ചു.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## ടെംപ്ലേറ്റിൽ ഉൾപ്പെടുന്നത്

| ഫോള്ഡർ / ഫയൽ| ഉള്ളടക്കം                                   |
| -------------- | ------------------------------------------ |
| `.vscode`      | ഡീബഗിങിനായി VSCode ഫയലുകൾ               |
| `.aitk`        | AI Toolkit-നുള്ള കോൺഫിഗറേഷൻ               |
| `src`          | കാലാവസ്ഥ MCP സർവറിന്റെ ഉറവഴി കോഡ്           |

## കാലാവസ്ഥ MCP സർവർ എങ്ങനെ ഡീബഗ് ചെയ്യാം

> കുറിപ്പുകൾ:
> - [MCP ഇൻസ്‌പെക്ടർ](https://github.com/modelcontextprotocol/inspector) MCP സർവറുകളുടെ ടെസ്റ്റിങ്ങിനും ഡീബഗിങിനും ദൃശ്യമേഖല ഡവലപ്പർ ടൂൾ ആണ്.
> - എല്ലാ ഡീബഗ് മോഡുകളും ബ്രേക്ക്പോയിൻറ് പിന്തുണയ്ക്കുന്നു, അതിൽ ടൂൾ നടപ്പാക്കൽ കോഡിൽ ബ്രേക്ക്പോയിൻറുകൾ ചേർക്കാം.

| ഡീബഗ് മോഡ് | വിവരണം | ഡീബഗ് നടത്താനുള്ള ഘട്ടങ്ങൾ |
| ----------- | -------- | -------------------------- |
| ഏജന്റ് ബിൽഡർ | AI Toolkit വഴി ഏജന്റ് ബിൽഡറിലെ MCP സർവർ ഡീബഗ് ചെയ്യുക. | 1. VS Code ഡീബഗ് പാനൽ തുറക്കുക. `Debug in Agent Builder` തിരഞ്ഞെടുത്ത് `F5` അമർത്തുക.<br>2. AI Toolkit Agent Builder ഉപയോഗിച്ച് [ഈ പ്രോംപ്റ്റ്](../../../../../../../../../../../open_prompt_builder) ഉപയോഗിച്ച് സെർവർ ടെസ്റ്റ് ചെയ്യുക. സെർവർ സ്വയം ഏജന്റ് ബിൽഡറുമായി ബന്ധപ്പെടും.<br>3. പ്രോംപ്റ്റിൽ `Run` ക്ലിക്ക് ചെയ്ത് ടെസ്റ്റ് ചെയ്യുക. |
| MCP ഇൻസ്‌പെക്ടർ | MCP ഇൻസ്‌പെക്ടർ ഉപയോഗിച്ച് MCP സർവർ ഡീബഗ് ചെയ്യുക. | 1. [Node.js](https://nodejs.org/) ഇൻസ്റ്റാൾ ചെയ്യുക<br>2. ഇൻസ്‌പെക്ടർ സജ്ജീകരിക്കുക: `cd inspector` && `npm install` <br>3. VS Code ഡീബഗ് പാനൽ തുറക്കുക. `Debug SSE in Inspector (Edge)` അല്ലെങ്കിൽ `Debug SSE in Inspector (Chrome)` തിരഞ്ഞെടുത്ത് `F5` അമർത്തുക.<br>4. MCP ഇൻസ്‌പെക്ടർ ബ്രൗസറിൽ തുറക്കുമ്പോൾ, `Connect` ബട്ടൺ അമർത്തി MCP സർവറുമായി ബന്ധിപ്പിക്കുക.<br>5. പിന്നീട് `List Tools` വിൻഡോയിൽ നിന്നും ടൂൾ തിരഞ്ഞെടുക്കുക, പാരാമീറ്ററുകൾ നൽകുക, പിന്നീട് `Run Tool` അമർത്തി സെർവർ കോഡ് ഡീബഗ് ചെയ്യുക.<br> |

## ഡീഫോൾട്ട് പോർട്ടുകളും അനുകൂലനങ്ങളും

| ഡീബഗ് മോഡ് | പോർട്ടുകൾ | നിർവചനങ്ങൾ | അനുകൂലനങ്ങൾ | കുറിപ്പ് |
| ------------ | ---------- | -------- | ------------ | -------- |
| ഏജന്റ് ബിൽഡർ | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | മേൽപ്പറഞ്ഞ പോർട്ടുകൾ മാറ്റാൻ [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) എഡിറ്റ് ചെയ്യുക. | അനുയോജ്യം ഇല്ല |
| MCP ഇൻസ്‌പെക്ടർ | 3001 (സർവർ); 5173 & 3000 (ഇൻസ്‌പെക്ടർ) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | മേൽപ്പറഞ്ഞ പോർട്ടുകൾ മാറ്റാൻ [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) എഡിറ്റ് ചെയ്യുക.| അനുയോജ്യം ഇല്ല |

## ഫീഡ്ബാക്ക്

ഈ ടെംപ്ലേറ്റിനെക്കുറിച്ചോ നിർദ്ദേശങ്ങളുണ്ടെങ്കിൽ, ദയവായി [AI Toolkit GitHub റിപ്പോസിറ്ററിയിൽ](https://github.com/microsoft/vscode-ai-toolkit/issues) ഒരു ഇഷ്യൂ തുറക്കൂ.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**പ്രത്യാഖ്യാനം**:  
ഈ രേഖ AI വിവർത്തന സേവനമായ [Co-op Translator](https://github.com/Azure/co-op-translator) ഉപയോഗിച്ച് വിവർത്തനം ചെയ്‌തതാണ്. നാം ശരിയായതിലേക്കു ശ്രമിച്ചെങ്കിലും, ഓട്ടോമാറ്റിക് വിവർത്തനങ്ങളിൽ പിഴവുകൾ അല്ലെങ്കിൽ കൃത്യതാ പിഴവുകൾ ഉണ്ടാകാൻ സാധ്യതയുണ്ടെന്നും ശ്രദ്ധിക്കുക. പ്രാഥമിക ഭാഷയിലുള്ള മൗലിക പകർപ്പാണ് വിശ്വസനീയമായ ഉറവിടം എന്നത് പരിഗണിക്കാവുന്നതാണ്. നിർണായക വിവരങ്ങൾക്കായി പ്രൊഫഷണൽ മനുഷ്യര്‍ നടത്തിയ വിവർത്തനം ശുപാർശ ചെയ്യപ്പെടുന്നു. ഈ വിവർത്തനത്തിന്റെ ഉപയോഗത്തിൽ നിന്ന് ഉണ്ടാകുന്ന തെറ്റിദ്ധാരണകൾക്കും വ്യാഖ്യാന പിഴവുകൾക്കും ഞങ്ങൾ ഉത്തരവാദിത്വം വഹിച്ചു കൊള്ളുന്നില്ല.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->