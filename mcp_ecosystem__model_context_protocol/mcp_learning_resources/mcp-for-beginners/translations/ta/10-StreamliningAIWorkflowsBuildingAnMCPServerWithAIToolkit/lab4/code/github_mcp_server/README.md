# வானிலை MCP சர்வர்

இது கைகாட்டல் பதில்களுடன் வானிலை கருவிகளை செயல்படுத்தும் Python இல் மாதிரி MCP சர்வர் ஆகும். இது உங்கள் சொந்த MCP சர்வருக்கான அடித்தளமாகப் பயன்படுத்தப்பட முடியும். இது பின்வரும் அம்சங்களை கொண்டுள்ளது:

- **வானிலை கருவி**: கொடுக்கப்பட்ட இடத்தின் அடிப்படையில் மாதிரி வானிலை தகவலை வழங்கும் கருவி.
- **Git Clone கருவி**: git ரிப்பொசிடரியை குறிப்பிட்ட கோப்புறைக்கு கிளோன் செய்யும் கருவி.
- **VS Code திறக்க கருவி**: ஒரு கோப்புறையை VS Code அல்லது VS Code Insiders இல் திறக்கும் கருவி.
- **Agent Builder உடன் இணைக்க**: MCP சர்வரை Agent Builder உடன் சேர்க்கவும் சோதனை மற்றும் பிழைதிருத்தத்திற்கான வசதி.
- **[MCP Inspector](https://github.com/modelcontextprotocol/inspector) மூலம் பிழைத்திருத்தம்**: MCP சர்வரை MCP Inspector உடன் பிழைத்திருத்த வசதி.

## Weather MCP Server மாதிரியைத் தொடங்க

> **முன் தேவைகள்**
>
> உங்கள் உள்ளூர் மேம்பாட்டு இயந்திரத்தில் MCP சர்வரை இயக்க, நீங்கள் தேவையாக உள்ளன:
>
> - [Python](https://www.python.org/)
> - [Git](https://git-scm.com/) (git_clone_repo கருவிக்குத் தேவை)
> - [VS Code](https://code.visualstudio.com/) அல்லது [VS Code Insiders](https://code.visualstudio.com/insiders/) (open_in_vscode கருவிக்குத் தேவை)
> - (*விருப்பமானது - uv விரும்பினால்*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## சுற்றுப்புறத்தை தயார் செய்யவும்

இந்த திட்டத்திற்கான சுற்றுப்புற அமைப்பிற்கு இரண்டு அணுகுமுறைகள் உள்ளன. உங்கள் விருப்பப்படி ஒன்றைப் தேர்வுசெய்யலாம்.

> குறிப்பு: வாட்சோட்கோடு அல்லது டெர்மினலை மீளலோடு செய்து உருவாக்கப்பட்ட முதல் சுற்றுப்புற பைதான் பயன்படுத்தப்படுகின்றது என்பதை உறுதி செய்யவும்.

| அணுகுமுறை | படிகள் |
| -------- | ----- |
| `uv` பயன்படுத்தி | 1. சுற்றுப்புறத்தை உருவாக்கவும்: `uv venv` <br>2. VSCode கட்டளை "***Python: Select Interpreter***" ஐ இயக்கி உருவாக்கிய சுற்றுப்புற பைதானைத் தேர்ந்தெடுக்கவும் <br>3. சார்புகளை (dev சார்புகளுடன்) நிறுவவும்: `uv pip install -r pyproject.toml --extra dev` |
| `pip` பயன்படுத்தி | 1. சுற்றுப்புறம் உருவாக்கவும்: `python -m venv .venv` <br>2. VSCode கட்டளை "***Python: Select Interpreter***" பயன்படுத்தி உருவாக்கிய சுற்றுப்புற பைதானைத் தேர்ந்தெடுக்கவும் <br>3. சார்புகளை (dev சார்புகளுடன்) நிறுவவும்: `pip install -e .[dev]` |

சுற்றுப்புறம் அமைக்கப் பிறகு, Agent Builder ஐ MCP கிளையன்ட் ஆகக் கொண்டு உங்கள் உள்ளூர் மேம்பாட்டு இயந்திரத்தில் சர்வரை இயக்க முடியும்:
1. VS Code பிழைத்திருத்தப் பேனலை திறக்கவும். `Debug in Agent Builder` ஐ தேர்ந்தெடுத்து அல்லது `F5` ஐ அழுத்தி MCP சர்வர் பிழைத்திருத்தத்தைத் தொடங்கவும்.
2. AI Toolkit Agent Builder ஐப் பயன்படுத்தி [இந்த prompt](../../../../../../../../../../../open_prompt_builder) கொண்டு சர்வரை சோதிக்கவும். சர்வர் автоматமாக Agent Builder உடன் இணைக்கப்படும்.
3. இடையூறு குறிப்பை `Run` கிளிக் செய்து சோதிக்கவும்.

**வாழ்த்துக்கள்**! நீங்கள் வெற்றிகரமாக Weather MCP Server ஐ Agent Builder மூலம் உங்கள் உள்ளூர் மேம்பாட்டு இயந்திரத்தில் MCP கிளையன்ட் ஆக இயக்கி உள்ளீர்கள்.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## மாதிரியில் உள்ளவை

| கோப்புறை / கோப்பு | உள்ளடக்கம்                                 |
| ---------------- | ----------------------------------------- |
| `.vscode`        | பிழைத்திருத்தத்திற்கான VSCode கோப்புகள் |
| `.aitk`          | AI Toolkit அமைப்புகள்                      |
| `src`            | வானிலை MCP சர்வருக்கான மூலக் கோடு      |

## Weather MCP Server ஐ எப்படி பிழைத்திருத்துவது

> குறிப்பு:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) MCP சர்வர்களை சோதித்தலும் பிழைத்திருத்தவும் பயன்படுத்தப்படும் ஒரு காட்சி வடிவமைப்பாளர் கருவி.
> - அனைத்து பிழைத்திருத்த முறைகளும் இடைவேளை புள்ளிகளை ஆதரிக்கின்றன, எனவே நீங்கள் கருவி செயல்பாட்டுக் கோடுகளில் இடைவேளை புள்ளிகளைச் சேர்க்கலாம்.

## கிடைக்கும் கருவிகள்

### வானிலை கருவி
`get_weather` கருவி குறிப்பிடப்பட்ட இடத்திற்கான மாதிரி வானிலை தகவலை வழங்குகிறது.

| அளவுரு    | வகை     | விளக்கம்                                      |
| ---------- | -------- | -------------------------------------------- |
| `location` | string   | வானிலை பெற இடம் (எ.கா., நகரப் பெயர், மாநிலம், அல்லது இடைமுகங்கள்) |

### Git Clone கருவி
`git_clone_repo` கருவி git ரிப்பொசிடரியை குறிப்பிட்ட கோப்புறையில் கிளோன் செய்கிறது.

| அளவுரு        | வகை   | விளக்கம்                                         |
| -------------- | ------| ------------------------------------------------|
| `repo_url`     | string| கிளோன் செய்ய வேண்டிய git ரிப்பொசிடரியின் URL       |
| `target_folder`| string| ரிப்பொசிடரி கிளோன் செய்ய வேண்டிய கோப்புரையின் பாதை   |

கருவி JSON பொருளை 반환ிக்கிறது:
- `success`: செயல் வெற்றியடையும்படியான boolean மதிப்பு
- `target_folder` அல்லது `error`: கிளோன் செய்யப்பட்ட பாதை அல்லது பிழை செய்தி

### VS Code Open கருவி
`open_in_vscode` கருவி ஒரு கோப்புறையை VS Code அல்லது VS Code Insiders செயலியில் திறக்கும்.

| அளவுரு         | வகை        | விளக்கம்                                   |
| --------------- | ---------- | ----------------------------------------- |
| `folder_path`   | string     | திறக்க வேண்டிய கோப்புரையின் பாதை           |
| `use_insiders`  | boolean (optional) | சாதாரண VS Code பதிலாக VS Code Insiders பயன்படுத்த வேண்டுமா |

கருவி JSON பொருளை 반환ிக்கிறது:
- `success`: செயல் வெற்றியடையும்படியான boolean மதிப்பு
- `message` அல்லது `error`: உறுதிப்படுத்தல் செய்தி அல்லது பிழை செய்தி

| பிழைத்திருத்த முறை | விளக்கம்                        | பிழைத்திருத்த படிகள்                                              |
| ----------------- | ------------------------------ | ---------------------------------------------------------------- |
| Agent Builder     | AI Toolkit மூலம் MCP சர்வரை Agent Builder இல் பிழைத்திருத்தம் | 1. VS Code பிழைத்திருத்தப் பேனலை திறக்கவும். `Debug in Agent Builder` ஐ தேர்ந்தெடுத்து `F5` அழுத்தி பிழைத்திருத்தம் தொடங்கவும்.<br>2. AI Toolkit Agent Builder ஐப் பயன்படுத்தி [இந்த prompt](../../../../../../../../../../../open_prompt_builder) கொண்டு சர்வரை சோதிக்கவும். சர்வர் தானாகவே Agent Builder உடன் இணைக்கப்படும்.<br>3. இடையூறை `Run` கிளிக் செய்யவும். |
| MCP Inspector    | MCP Inspector மூலம் MCP சர்வரை பிழைத்திருத்தம் | 1. [Node.js](https://nodejs.org/) ஐ நிறுவவும்<br>2. Inspector அமைக்க: `cd inspector` && `npm install` <br>3. VS Code பிழைத்திருத்தப் பேனலை திறக்கவும். `Debug SSE in Inspector (Edge)` அல்லது `Debug SSE in Inspector (Chrome)` ஐ தேர்ந்தெடுத்து F5 அழுத்தி பிழைத்திருத்தம் தொடங்கவும்.<br>4. MCP Inspector உலாவியில் துவங்கும் போது `Connect` பொத்தானை கிளிக் செய்து இந்த MCP சர்வருடன் இணைக்கவும்.<br>5. பிறகு, `List Tools` தேர்வு செய்து கருவியைத் தேர்ந்தெடுத்து அளவுருக்களை கொடுத்து `Run Tool` மூலம் உங்கள் சர்வர் கோடு பிழைத்திருத்தம் செய்யலாம்.<br> |

## இயல்பான போர்ட்கள் மற்றும் தனிப்பயனாக்கங்கள்

| பிழைத்திருத்த முறை | போர்ட்கள்                          | வரையறைகள்                         | தனிப்பயனாக்கங்கள்                                         | குறிப்பு   |
| ----------------- | -------------------------------- | --------------------------------- | ---------------------------------------------------------- | --------- |
| Agent Builder     | 3001                             | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | மேலே பட்ட போர்ட்களை மாற்ற [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) திருத்தவும். | பொருந்தாது |
| MCP Inspector    | 3001 (Server); 5173 & 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | மேலே பட்ட போர்ட்களை மாற்ற [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) திருத்தவும்.| பொருந்தாது |

## கருத்துக்கள்

இந்த மாதிரிக்கு உங்கள் கருத்துகள் அல்லது பரிந்துரைகள் இருப்பின், தயவுசெய்து [AI Toolkit GitHub தொகுப்பில்](https://github.com/microsoft/vscode-ai-toolkit/issues) ஒரு issue ஐ திறக்கவும்.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**தயவு அறிக்கை**:  
இந்த ஆவணம் AI மொழி மாற்று சேவை [Co-op Translator](https://github.com/Azure/co-op-translator) பயன்படுத்தி மொழிபெயர்க்கப்பட்டுள்ளது. துல்லியத்திற்காக முயன்று வந்தாலும், தானாக செய்யப்பட்ட மொழிபெயர்ப்புகளில் பிழைகள் அல்லது தவறுகள் இருக்க வாய்ப்பு உள்ளது என்பதை அறிவிக்கிறோம். தாய்மொழியில் உள்ள அசல் ஆவணம் அதிகாரபூர்வ மூலமாக கருதப்பட வேண்டும். முக்கியமான தகவல்களுக்கு, தொழில்முறை மனித மொழிபெயர்ப்பை பயன்படுத்த பரிந்துரைக்கப்படுகிறது. இந்த மொழிபெயர்ப்பை பயன்படுத்துவதால் உருவாகும் தவறான புரிதல் அல்லது தவறான விளக்கங்களுக்கு எங்களால் பொறுப்பு ஏற்கப்படாது.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->