# Weather MCP Server

Python နဲ့ရေးထားတဲ့ weather tool တွေကို mock response တွေနဲ့အတူ 구현 လုပ်ထားတဲ့ MCP Server ရဲ့ နမူနာ ဖြစ်ပါတယ်။ သင့်ပိုင် MCP Server ပေါ်မှာ Scaffold အဖြစ်သုံးနိုင်သည်။ အောက်ပါ Features တွေပါဝင်သည်။

- **Weather Tool**: ပေးထားသော Location အပေါ် အခြေတည်၍ mock ထုတ်ထားသော ရာသီအခြေအနေ သတင်းအချက်အလက်များပေးသော tool ဖြစ်သည်။
- **Agent Builder နဲ့ ချိတ်ဆက်ခြင်း**: MCP server ကို Agent Builder နှင့် ချိတ်ဆက်ကာ စမ်းသပ် debug လုပ်နိုင်စေသည်။
- **[MCP Inspector](https://github.com/modelcontextprotocol/inspector) မှာ Debug လုပ်ခြင်း**: MCP Inspector tool များဖြင့် MCP Server ကို Debug လုပ်နိုင်သည်။

## Weather MCP Server Template ဖြင့် စတင်ရန်

> **လိုအပ်ချက်များ**
>
> သင်၏ ဒေဗလော့ပ် မက်ရှင်၌ MCP Server ကို ချိန်ဆစေလိုပါက အောက်ပါအရာများလိုအပ်ပါမည်။
>
> - [Python](https://www.python.org/)
> - (*Optional - uv သုံးချင်ပါက*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## ပတ်ဝန်းကျင် ပြင်ဆင်ခြင်း

ဒီ Project အတွက် ပတ်ဝန်းကျင် ပြင်ဆင်ဖို့ နည်းလမ်း နှစ်ခု ရှိသည်။ သင်နှစ်သက်ရာ နည်းလမ်းတစ်ခုကို ရွေးနိုင်သည်။

> မှတ်ချက် - virtual environment တည်ဆောက်ပြီးနောက် VSCode သို့ terminal ကို ပြန်လည်ကူးရန် virtual environment တွင်ပါသော python ကို အသုံးပြုမှု အတည်ပြုရန်။

| နည်းလမ်း | အဆင့်များ |
| -------- | --------- |
| `uv` အသုံးပြုခြင်း | 1. virtual environment တည်ဆောက်ရန် - `uv venv` <br>2. VSCode Command "Python: Select Interpreter" ဖြင့် virtual environment ထဲမှ python ကို ရွေးချယ်ရန် <br>3. ဝန္ေဆာင္မႈများကို ထည့်သွင်းရန် (dev dependencies ပါဝင်သည်) - `uv pip install -r pyproject.toml --extra dev` |
| `pip` အသုံးပြုခြင်း | 1. virtual environment တည်ဆောက်ရန် - `python -m venv .venv` <br>2. VSCode Command "Python: Select Interpreter" ဖြင့် virtual environment ထဲမှ python ကို ရွေးချယ်ရန်<br>3. ဝန္ေဆာင္မႈများကို ထည့်သွင်းရန် (dev dependencies ပါဝင်သည်) - `pip install -e .[dev]` |

ပတ်ဝန်းကျင် ပြင်ဆင်ပြီးနောက် သင်၏ ဒေဗလော့ပ် မက်ရှင်တွင် MCP Client အဖြစ် Agent Builder ကနေ ဆာဗာကို ပြေးနိုင်သည်။
1. VS Code Debug panel ကို ဖွင့်၍ `Debug in Agent Builder` ကို ရွေးချယ်ပြီး `F5` နှိပ်ကာ MCP server ကို debug စတင်ပါ။
2. AI Toolkit Agent Builder ကို သုံးပြီး [ဒီ prompt နဲ့](../../../../../../../../../../../open_prompt_builder) ဆာဗာကို စမ်းသပ်ပါ။ ဆာဗာသည် အလိုအလျောက် Agent Builder နဲ့ ချိတ်ဆက်ထားပါလိမ့်မည်။
3. Prompt နှင့် `Run` ကိုနှိပ်ကာ ဆာဗာကို စမ်းသပ်ပါ။

**ဂုဏ်ယူပါတယ်**! သင်သည် Agent Builder ဖြင့် MCP Client အဖြစ် သင့်ဒေဗလော့ပ် မက်ရှင်တွင် Weather MCP Server ကို အောင်မြင်စွာ ပြေးနိုင်ပြီးဖြစ်ပါသည်။
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Template တွင် ပါဝင်သည့် အရာများ

| ဖိုလ်ဒါ / ဖိုင်| အကြောင်းအရာလေးများ                             |
| ------------ | -------------------------------------------- |
| `.vscode`    | Debugging အတွက် VSCode ဖိုင်များ                 |
| `.aitk`      | AI Toolkit အတွက် Configuration များ             |
| `src`        | Weather MCP server အီး source code များ           |

## Weather MCP Server ကို ဘယ်လို debug လုပ်မလဲ

> မှတ်ချက်များ:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) သည် MCP servers များကို စမ်းသပ်ရန်နှင့် debugging ပြုလုပ်ရန် ကြည်လင်မြင်သာသော developer tool ဖြစ်သည်။
> - Debugging mode အားလုံးမှာ breakpoints ကို support လုပ်သဖြင့် tool implementation code တွင် breakpoints ထည့်နိုင်ပါသည်။

| Debug Mode | ဖော်ပြချက် | Debug လုပ်ရန်အဆင့်များ |
| ---------- | --------- | -------------------- |
| Agent Builder | AI Toolkit ဖြင့် Agent Builder တွင် MCP server ကို Debug လုပ်သည်။ | 1. VS Code Debug panel ကိုဖွင့်ပြီး `Debug in Agent Builder` ကို ရွေးပြီး `F5` ကိုနှိပ်ကာ MCP server ကို debug စတင်ရန်။<br>2. AI Toolkit Agent Builder သုံးပြီး [ဒီ prompt နဲ့](../../../../../../../../../../../open_prompt_builder) ဆာဗာကို စမ်းသပ်ပါ။ ဆာဗာသည် အလိုအလျောက် Agent Builder နှင့် ချိတ်ဆက်ရပါလိမ့်မည်။<br>3. Prompt ဖြင့် စမ်းသပ်ရန် `Run` ကိုနှိပ်ပါ။ |
| MCP Inspector | MCP Inspector သုံးပြီး MCP server ကို debug လုပ်သည်။ | 1. [Node.js](https://nodejs.org/) ထည့်သွင်းပါ။<br> 2. Inspector set up ပြုလုပ်ရန် - `cd inspector` && `npm install`<br> 3. VS Code Debug panel ကိုဖွင့်ပြီး `Debug SSE in Inspector (Edge)` သို့မဟုတ် `Debug SSE in Inspector (Chrome)` ကိုရွေးကာ `F5` နှိပ်ကာ debugging စတင်ပါ။<br> 4. MCP Inspector browser မှာ သွားရာ MCP server အတွက် `Connect` ခလုတ်ကို နှိပ်ပြီး ချိတ်ဆက်ပါ။<br> 5. ထို့နောက် `List Tools` ပြီး tool ရွေးချယ်၊ parameter ထည့်ပြီး `Run Tool` ဖြင့် သင့် server code ကို debug လုပ်နိုင်သည်။<br> |

## Default Port များနှင့် အပ်ဒိတ်လုပ်ရာများ

| Debug Mode | Port များ | ဖော်ပြချက်များ | အပ်ဒိတ်လုပ်ခြင်း | မှတ်ချက် |
| ---------- | --------- | ------------ | -------------- | -------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | အထက် Port များကို ပြောင်းလဲလိုပါက [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) ဖိုင်များကို ပြင်ဆင်ပါ။ | N/A |
| MCP Inspector | 3001 (Server); 5173 နှင့် 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | အထက် Port များကို ပြောင်းလဲလိုပါက [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) ဖိုင်များကို ပြင်ဆင်ပါ။ | N/A |

## တုံ့ပြန်ချက်

ဒီ template အတွက် သင်တွင် တုံ့ပြန်ချက်များ သို့မဟုတ် အကြံပြုချက်များ ရှိပါက [AI Toolkit GitHub Repository](https://github.com/microsoft/vscode-ai-toolkit/issues) တွင် Issue တစ်ခု ဖွင့်ပါ။

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ဖော်ပြချက်**  
ဤစာတမ်းကို AI ဘာသာပြန်စနစ် [Co-op Translator](https://github.com/Azure/co-op-translator) ဖြင့် ဘာသာပြန်ထားသည်။ ကျွန်ုပ်တို့သည် တိကျမှုအတွက် ကြိုးစားသော်လည်း စက်ယန္တရား ဘာသာပြန်မှုများတွင် အမှားများ သို့မဟုတ် မမှန်ကန်မှုများ ပါရှိနိုင်ကြောင်း သတိပြုပါ။ မူရင်းစာတမ်းကို တိုင်းရင်းဘာသာဖြင့်သာ မှန်ကန်သောအချက်အလက်အနေနှင့် ယူဆသင့်သည်။ ထိပ်တန်းအရေးကြီးသော အသိပညာများအတွက် အထူးပြု လူ့ဘာသာပြန်မှုကို အကြံပြုပါသည်။ ဤဘာသာပြန်မှုအသုံးပြုမှုကြောင့် ဖြစ်ပေါ်နိုင်သည့် နားမလည်မှု သို့မဟုတ် မှားယွင်းဖတ်ရှုမှုများအတွက် ကျွန်ုပ်တို့ တာဝန်မယူပါ။
<!-- CO-OP TRANSLATOR DISCLAIMER END -->