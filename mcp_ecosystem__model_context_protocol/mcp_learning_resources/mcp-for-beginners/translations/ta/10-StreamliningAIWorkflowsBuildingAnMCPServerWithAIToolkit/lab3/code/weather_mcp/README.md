# Weather MCP Server

Python இல் உருவாக்கப்பட்ட இது வானிலை கருவிகள் மற்றும் மாக்கு பதில்களுடன் செயல்படும் ஒரு மாதிரி MCP Server ஆகும். இது உங்கள் சொந்த MCP Server க்கான ஒரு அடித்தளமாக பயன்படுத்தக்கூடியது. இதன் உள்ளடக்கங்கள் பின்வருமாறு:

- **Weather Tool**: கொடுக்கப்பட்ட இடத்தின் அடிப்படையில் மாக்கு வானிலை தகவலை வழங்கும் கருவி.
- **Agent Builder உடன் இணைக்கவும்**: MCP சர்வரை Agent Builder உடன் இணைத்து சோதனை மற்றும் பிழைத்திருத்தத்திற்கான வசதி.
- **[MCP Inspector](https://github.com/modelcontextprotocol/inspector) மூலம் பிழைத்திருத்தம்**: MCP Inspector ஐ பயன்படுத்தி MCP Server ஐ பிழைத்திருத்தும் வசதி.

## Weather MCP Server வார்ப்புருவுடன் ஆரம்பிக்கவும்

> **முன்பாக தேவைப்படும் பொருட்கள்**
>
> உங்கள் உள்ளூர்முறை டெவ் கணினியில் MCP Server இயக்கு, உங்களுக்கு தேவையானவை:
>
> - [Python](https://www.python.org/)
> - (*விருப்பம் - uv பயன்படுத்த விரும்பினால்*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## சூழலை தயார் செய்வது

இந்த திட்டத்திற்கான சூழலை அமைக்க இரண்டு முறைகள் உள்ளன. உங்கள் விருப்பத்தின் படி எதையாவது தேர்வு செய்யலாம்.

> குறிப்பு: வைர்ச்சுவல் சூழலை உருவாக்கிய பின்னர் VSCode அல்லது டெர்மினலை மீண்டும் தொடக்கி, வைர்ச்சுவல் சூழலின் பைதான் பயன்படுத்தப்படுவதை உறுதிப்படுத்தவும்.

| முறை | படிகள் |
| -------- | ----- |
| `uv` பயன்படுத்தி | 1. வைர்ச்சுவல் சூழல் உருவாக்கவும்: `uv venv` <br>2. VSCode இல் "***Python: Select Interpreter***" கமாண்ட் ஓட்டவும், உருவாக்கிய வைர்ச்சுவல் சூழலின் பைதானை தேர்ந்தெடுக்கவும் <br>3. சார்புகள் மற்றும் டெவ் சார்புகள் நிறுவ: `uv pip install -r pyproject.toml --extra dev` |
| `pip` பயன்படுத்தி | 1. வைர்ச்சுவல் சூழல் உருவாக்கவும்: `python -m venv .venv` <br>2. VSCode இல் "***Python: Select Interpreter***" கமாண்ட் ஓட்டவும், உருவாக்கிய வைர்ச்சுவல் சூழலின் பைதானை தேர்ந்தெடுக்கவும்<br>3. சார்புகள் மற்றும் டெவ் சார்புகள் நிறுவ: `pip install -e .[dev]` | 

சூழலை அமைத்த பிறகு, MCP Client ஆக Agent Builder வழியாக உங்கள் உள்ளூர் டெவ் கணினியில் சர்வரை ஓட்டலாம்:
1. VS Code பிழைத்திருத்த குழுவை திறக்கவும். `Debug in Agent Builder` ஐ தேர்வு செய்து அல்லது `F5` நொடுத்து MCP சர்வரை பிழைத்திருத்தத் தொடங்கவும்.
2. Microsoft Foundry Toolkit Agent Builder ஐ பயன்படுத்தி சர்வரை [இந்த பதிவாக்கப் பயன்படுத்தி](../../../../../../../../../../../open_prompt_builder) சோதனை செய்யவும். சர்வர் தானாகவே Agent Builder உடன் இணைக்கப்படும்.
3. `Run` க்ளிக் செய்து பதிவாக்கத்துடன் சர்வரை சோதிக்கவும்.

**வாழ்த்துக்கள்**! நீங்கள் வெற்றிகரமாக Weather MCP Server ஐ உங்கள் உள்ளூர் டெவ் கணினியில் Agent Builder வழியாக MCP Client ஆக இயக்கியுள்ளீர்கள்.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## வார்ப்புருவில் உள்ளவை

| கோப்புறை / கோப்பு| உள்ளடக்கங்கள்                                 |
| ------------ | -------------------------------------------- |
| `.vscode`    | பிழைத்திருத்தத்திற்கான VSCode கோப்புகள்       |
| `.aitk`      | Microsoft Foundry Toolkit க்கான கட்டமைப்புகள் |
| `src`        | weather mcp server க்கான மூலக் குறியீடு        |

## Weather MCP Server ஐ எப்படி பிழைத்திருத்துவது

> குறிப்பு:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) என்பது MCP சர்வர்களை சோதனையிட மற்றும் பிழைத்திருத்த காட்சிப்படுத்தும் டெவலப்பர் கருவி.
> - அனைத்து பிழைத்திருத்த முறைகளும் பிரேக்க்பாயிண்-ஐ ஆதரிக்கின்றன, எனவே கருவி அமலாக்க குறியீட்டில் பிரேக்க்பாயிண்களை சேர்க்கலாம்.

| பிழைத்திருத்த முறை | விளக்கம் | பிழைத்திருத்த படிகள் |
| ---------- | ----------- | --------------- |
| Agent Builder | Microsoft Foundry Toolkit மூலம் Agent Builder இல் MCP சர்வரை பிழைத்திருத்து. | 1. VS Code பிழைத்திருத்த குழுவை திறக்கவும். `Debug in Agent Builder` ஐ தேர்ந்தெடுத்து `F5` அழுத்தி MCP சர்வரை பிழைத்திருத்தத் தொடங்கவும்.<br>2. Microsoft Foundry Toolkit Agent Builder ஐ பயன்படுத்தி சர்வரை [இந்த பதிவாக்கத்துடன்](../../../../../../../../../../../open_prompt_builder) சோதிக்கவும். சர்வர் தானாகவே Agent Builder உடன் இணைக்கப்படும்.<br>3. பதிவாக்கத்துடன் சர்வரை சோதிக்க `Run` ஐ கிளிக் செய்யவும். |
| MCP Inspector | MCP Inspector ஐ பயன்படுத்தி MCP சர்வரை பிழைத்திருத்து. | 1. [Node.js](https://nodejs.org/) ஐ நிறுவவும்<br> 2. Inspector ஐ அமைக்க: `cd inspector` && `npm install` <br> 3. VS Code பிழைத்திருத்த குழுவை திறக்கவும். `Debug SSE in Inspector (Edge)` அல்லது `Debug SSE in Inspector (Chrome)` ஐ தேர்ந்தெடுத்து F5 அழுத்தவும்.<br> 4. MCP Inspector உலாவியில் துவங்கும் போது, `Connect` பொத்தானை கிளிக் செய்து இந்த MCP சர்வருடன் இணைக்கவும்.<br> 5. பின்னர் நீங்கள் `List Tools` செய்து கருவியை தேர்ந்தெடுத்து உள்ளீடு அளித்து, `Run Tool` மூலம் உங்கள் சர்வர் குறியீட்டை பிழைத்திருத்தலாம்.<br> |

## இயல்புநிலைய போர்டுகள் மற்றும் தானியங்கி மாற்றங்கள்

| பிழைத்திருத்த முறை | போர்டுகள் | வரையறைகள் | மாற்றங்கள் | குறிப்பு |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | மேலுள்ள போர்டுகளை மாற்ற [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) கோப்புகளை திருத்தவும். | பொருந்தாது |
| MCP Inspector | 3001 (Server); 5173 மற்றும் 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | மேலுள்ள போர்டுகளை மாற்ற [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) கோப்புகளை திருத்தவும்.| பொருந்தாது |

## கருத்துக்கள்

இந்த வார்ப்புருவுக்கு உங்கள் கருத்துக்கள் அல்லது பரிந்துரைகள் இருந்தால், தயவுசெய்து [Microsoft Foundry Toolkit GitHub கிடைப்பகத்தில்](https://github.com/microsoft/vscode-ai-toolkit/issues) ஒரு பிரச்சினையை திறக்கவும்.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**மறுப்பு**:
இந்த ஆவணம் AI மொழிபெயர்ப்பு சேவை [Co-op Translator](https://github.com/Azure/co-op-translator) பயன்படுத்தி மொழிபெயர்க்கப்பட்டுள்ளது. நாங்கள் துல்லியத்திற்காக முயற்சி செய்துள்ளோம், ஆனால் தானாக செய்யப்படும் மொழிபெயர்ப்புகளில் பிழைகள் அல்லது தவறுகள் இருக்கலாம் என்பதை கவனத்தில் கொள்ளவும். அசல் ஆவணம் அதன் தாய்மொழியில் அதிகாரப்பூர்வ ஆதாரமாக கருதப்பட வேண்டும். முக்கியமான தகவல்களுக்கு, தொழில்நுட்பமான மனித மொழிபெயர்ப்பு பரிந்துரைக்கப்படுகிறது. இந்த மொழிபெயர்ப்பைப் பயன்படுத்துவதால் ஏற்படும் எந்த தவறான புரிதல்கள் அல்லது தவறான விளக்கத்திற்கும் நாங்கள் பொறுப்பில்வில்லை.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->