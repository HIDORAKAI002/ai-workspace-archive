# Weather MCP சேவை

இது வாதாடல் பதில்களுடன் வானிலை கருவிகளை செயல்படுத்தும் Python இல் உருவாக்கப்பட்ட மாதிரி MCP சேவை. உங்கள் சொந்த MCP சேவைக்கான அடித்தளமாக இது பயன்படுத்தப்படலாம். இது பின்வரும் செயல்பாடுகளை உள்ளடக்கியது:

- **வானிலை கருவி**: வழங்கப்பட்ட இடத்தின் அடிப்படையில் வாதாடல் வானிலை தகவல்களை வழங்கும் கருவி.
- **ஏஜென்ட் கட்டுமானத்துடன் இணைப்பு**: டெஸ்டிங் மற்றும் பிழைத்திருத்தத்திற்கு MCP சேவையை ஏஜென்ட் கட்டுமானத்துடன் இணைக்கும் செயல்பாடு.
- **[MCP ஆய்வாளர்](https://github.com/modelcontextprotocol/inspector) மூலம் பிழைத்திருத்தம்**: MCP சேவையை MCP ஆய்வாளர் பயன்படுத்தி பிழைத்திருத்தம் செய்யும் செயல்பாடு.

## Weather MCP சேவை மாதிரியுடன் துவங்குதல்

> **முன்னுரிமைகள்**
>
> உங்கள் உள்ளூர்திரைப்பட இயந்திரத்தில் MCP சேவையை இயக்கு, கீழ்கண்டவை தேவைப்படும்:
>
> - [Python](https://www.python.org/)
> - (*விருப்பமானது - uv ஐ விரும்பினால்*) [uv](https://github.com/astral-sh/uv)
> - [Python பிழைத்திருத்தி நீட்டிப்பு](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## சூழலைத் தயார் செய்வது

இந்த திட்டத்துக்கான சூழலை அமைக்க இரண்டு முயற்சிகள் உள்ளன. உங்கள் விருப்பத்தின் அடிப்படையில் எந்தவொன்றையும் தேர்வு செய்யலாம்.

> குறிப்பு: மெய்நிகர் சூழல் python பயன்படுத்தப்படுவதை உறுதிப்படுத்த VSCode அல்லது டெர்மினலை மீண்டும் தொடங்கவும்.

| முயற்சி | படிகள் |
| -------- | ----- |
| `uv` ஐ பயன்படுத்துதல் | 1. மெய்நிகர் சூழலை உருவாக்கவும்: `uv venv` <br>2. VSCode கட்டளை "***Python: Select Interpreter***" ஓட்டி உருவான மெய்நிகர் சூழல் python ஐத் தேர்ந்தெடுக்கவும்<br>3. தேவைகள் (dev தேவைகள் உட்பட) நிறுவவும்: `uv pip install -r pyproject.toml --extra dev` |
| `pip` ஐ பயன்படுத்துதல் | 1. மெய்நிகர் சூழலை உருவாக்கவும்: `python -m venv .venv` <br>2. VSCode கட்டளை "***Python: Select Interpreter***" ஓட்டி உருவான மெய்நிகர் சூழல் python ஐத் தேர்ந்தெடுக்கவும்<br>3. தேவைகள் (dev தேவைகள் உட்பட) நிறுவவும்: `pip install -e .[dev]` |

சூழலை அமைத்துக்கொண்ட பிறகு, நீங்கள் MCP Client ஆக உள்ளூர் இயந்திரத்தில் Agent Builder மூலம் சேவையை இயக்கலாம்:
1. VS Code பிழைத்திருத்த கோப்புறையை திறக்கவும். `Debug in Agent Builder` ஐ தேர்ந்தெடுத்து MCP சேவையை பிழைத்திருத்த F5 ஐ அழுத்தவும்.
2. AI Toolkit Agent Builder மூலம் [இந்த கேள்வியுடன்](../../../../../../../../../../../open_prompt_builder) சேவையை சோதிக்கவும். சேவை தானாகவே Agent Builder உடன் இணைக்கப்படும்.
3. கேள்வியுடன் சேவையை சோதிக்க `Run` ஐ கிளிக் செய்யவும்.

**வாழ்த்துக்கள்**! நீங்கள் வெற்றிகரமாக உங்கள் உள்ளூர்_dev கணினியில் Agent Builder மூலம் MCP Client ஆக Weather MCP சேவையை இயக்கியுள்ளீர்கள்.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## மாதிரியில் உள்ளவை

| கோப்பகம் / கோப்பு | உள்ளடக்கம்                                  |
| ------------ | ----------------------------------------- |
| `.vscode`    | பிழைத்திருத்தத்திற்கான VSCode கோப்புகள்    |
| `.aitk`      | AI கருவிக்கான கட்டமைப்புகள்               |
| `src`        | வானிலை mcp சேவைக்கு மூலக் குறியீடு         |

## Weather MCP சேவையை பிழைத்திருத்துவது எப்படி

> குறிப்புகள்:
> - [MCP ஆய்வாளர்](https://github.com/modelcontextprotocol/inspector) என்பது MCP சேவைகளை சோதனை மற்றும் பிழைத்திருத்துவதற்கான பார்வை வளர்த்தல் கருவியாகும்.
> - அனைத்து பிழைத்திருத்த முறைகளும் இடைமுகங்களை ஆதரிக்கின்றன, ஆகவே கருவி செயல்பாணிக் குறியீட்டுக்கு இடைமுகங்களை சேர்க்கலாம்.

| பிழைத்திருத்த முறை | விளக்கம் | பிழைத்திருத்த படிகள் |
| ---------- | ----------- | --------------- |
| Agent Builder | AI கருவியலுடன் Agent Builder இல் MCP சேவையை பிழைத்திருத்துக. | 1. VS Code பிழைத்திருத்த கோப்புறையை திறக்கவும். `Debug in Agent Builder` தேர்ந்து F5 அழுத்தி MCP சேவையை பிழைத்திருத்த தொடங்கவும்.<br>2. AI கருவி Agent Builder பயன்படுத்தி [இந்த கேள்வியுடன்](../../../../../../../../../../../open_prompt_builder) சேவையை சோதிக்கவும். சேவை தானாக Agent Builder உடன் இணைக்கப்படும்.<br>3. கேள்வியுடன் சேவையை சோதிக்க `Run` ஐ கிளிக் செய்யவும். |
| MCP ஆய்வாளர் | MCP ஆய்வாளர் பயன்படுத்தி MCP சேவையை பிழைத்திருத்துக. | 1. [Node.js](https://nodejs.org/) நிறுவவும்<br>2. ஆய்வாளரை அமைக்கவும்: `cd inspector` && `npm install` <br> 3. VS Code பிழைத்திருத்த கோப்புறையை திறக்கவும். `Debug SSE in Inspector (Edge)` அல்லது `Debug SSE in Inspector (Chrome)` தேர்வு செய்து F5 அழுத்தி பிழைத்திருத்த தொடங்கவும்.<br>4. MCP ஆய்வாளர் உலாவியில் திறக்கும்போது, இந்த MCP சேவையை இணைக்க `Connect` பொத்தானை கிளிக் செய்யவும்.<br>5. பின்னர் நீங்கள் `List Tools` செய்ய, கருவியை தேர்வு செய்து, அளவுருக்கள் வழங்கி, `Run Tool` மூலம் உங்கள் சேவை குறியீட்டை பிழைத்திருத்தம் செய்யலாம்.<br> |

## இயல்புநிலை துவாரங்கள் மற்றும் சிதைவுகள்

| பிழைத்திருத்த முறை | துவாரங்கள் | விளக்கங்கள் | சிதைவுகள் | குறிப்பு |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | மேலே உள்ள துவாரங்களைக் மாற்ற [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) ஐ திருத்தவும். | பொருளில்லை |
| MCP ஆய்வாளர் | 3001 (சேவை); 5173 மற்றும் 3000 (ஆய்வாளர்) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | மேலே உள்ள துவாரங்களைக் மாற்ற [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) ஐ திருத்தவும்.| பொருளில்லை |

## கருத்து

இந்த மாதிரிக்கான ஏதேனும் கருத்துகள் அல்லது பரிந்துரைகள் இருந்தால், [AI கருவி GitHub சேமிப்பகத்தில்](https://github.com/microsoft/vscode-ai-toolkit/issues) ஒரு பிரச்சனையைத் திறக்கவும்.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**இலக்கணம்**:  
இந்த ஆவணம் [Co-op Translator](https://github.com/Azure/co-op-translator) என்ற செயற்கை நுண்ணறிவு மொழிபெயர்ப்பு சேவையை பயன்படுத்தி மொழிபெயர்க்கப்பட்டுள்ளது. நாங்கள் துல்லியத்தைக் கவனித்துப் பணியாற்றினாலும், தானாக உருவாகும் மொழிபெயர்ப்புகளில் பிழைகள் அல்லது தவறுகள் இருக்க வாய்ப்பு உள்ளது என்பதை தயவுசெய்து அறிந்து கொள்ளவும். அதன் சொந்த மொழியில் இருக்கும் அசல் ஆவணம் அதிகாரபூர்வமான ஆதாரமாக கருதப்பட வேண்டும். முக்கியமான தகவல்களுக்கு, தொழில்முறை மனித மொழி பெயர்ப்பு பரிந்துரைக்கப்படுகிறது. இந்த மொழிபெயர்ப்பின் பயன்பாட்டில் ஏற்படக்கூடிய எந்த தவறான புரிதல்களுக்கும் அல்லது தவறான விளக்கங்களுக்கும் நாங்கள் பொறுப்பேற்போமில்லை.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->