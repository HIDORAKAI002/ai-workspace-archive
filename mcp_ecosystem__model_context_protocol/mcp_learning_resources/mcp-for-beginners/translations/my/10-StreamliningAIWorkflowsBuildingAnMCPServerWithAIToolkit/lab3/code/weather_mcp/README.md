# မိုးလေဝသ MCP ဆာဗာ

ဤသည်မှာ မိုးလေဝသကိရိယာများကို မော့ခ် တုံ့ပြန်မှုများဖြင့် တည်ဆောက်ထားသည့် Python သုံး MCP ဆာဗာ တစ်ခုဖြစ်သည်။ သင့်ရဲ့ ကိုယ်ပိုင် MCP ဆာဗာအတွက် အခြေခံပုံစံအဖြစ် အသုံးပြုနိုင်ပါသည်။ အင်္ဂါရပ်များမှာ အောက်ပါအတိုင်းဖြစ်သည်-

- **မိုးလေဝသ ကိရိယာ**: ပေးထားသော တည်နေရာအခြေခံ၍ မော့ခ်ထားသော မိုးလေဝသသတင်းအချက်အလက်များကို ပေးသော ကိရိယာတစ်ခု။
- **Agent Builder နှင့် ချိတ်ဆက်ခြင်း**: MCP ဆာဗာကို စမ်းသပ်ခြင်းနှင့် အမှားရှာဖွေရေးအတွက် Agent Builder နှင့် ချိတ်ဆက်နိုင်စေရန် အင်္ဂါရပ်။
- **[MCP Inspector](https://github.com/modelcontextprotocol/inspector) တွင် Debug ပြုလုပ်ခြင်း**: MCP Inspector ကို အသုံးပြုပြီး MCP ဆာဗာကို Debug ပြုလုပ်နိုင်ရန် အင်္ဂါရပ်။

## Weather MCP Server အတွက် စတင်အသုံးပြုခြင်း

> **လိုအပ်ချက်များ**
>
> သင့်ဒေသတွင် MCP ဆာဗာကို အလုပ်လုပ်စေရန် အောက်ပါအရာများလိုအပ်ပါမည်။
>
> - [Python](https://www.python.org/)
> - (*ရွေးချယ်စရာ - uv ကို သုံးချင်ပါက*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## ပတ်ဝန်းကျင် ပြင်ဆင်ခြင်း

ဤပရောဂျက်အတွက် ပတ်ဝန်းကျင်ပြင်ဆင်ရန်နည်းလမ်းနှစ်မျိုးရှိသည်။ သင့်နှစ်သက်ရာကို ရွေးချယ်နိုင်သည်။

> မှတ်ချက်: virtual environment ဖန်တီးပြီးနောက် VSCode သို့မဟုတ် terminal ကို ပြန်လည်ဖွင့်ပြီး virtual environment မှ python ကို သုံးနေကြောင်း သေချာစေရန်။

| နည်းလမ်း | အဆင့်များ |
| -------- | ---------- |
| `uv` အသုံးပြုခြင်း | 1. virtual environment ဖန်တီးရန်: `uv venv` <br>2. VSCode မှ "Python: Select Interpreter" များကို သွား၍ ဖန်တီးထားသော virtual environment အတွင်းရှိ python ကို ရွေးချယ်မည် <br>3. ဆော့ဖ်ဝဲလိုအပ်ချက်များ (dev dependencies ပါဝင်သည်) ထည့်သွင်းရန်: `uv pip install -r pyproject.toml --extra dev` |
| `pip` အသုံးပြုခြင်း | 1. virtual environment ဖန်တီးရန်: `python -m venv .venv` <br>2. VSCode ၏ "Python: Select Interpreter" ကို သုံးပြီး ဖန်တီးပြီးသော virtual environment မှ python ကို ရွေးချယ်မည် <br>3. ဆော့ဖ်ဝဲလိုအပ်ချက်များ (dev dependencies ပါဝင်သည်) ထည့်သွင်းရန်: `pip install -e .[dev]` |

ပတ်ဝန်းကျင် ပြင်ဆင်ပြီးပါက၊ Agent Builder ကို MCP Client အဖြစ် အသုံးပြု၍ သင့်ဒေသ အတွင်း ဆာဗာကို ပြေးရန် အောက်ပါအတိုင်း ဆောင်ရွက်ပါ-
1. VS Code ရဲ့ Debug panel ကို ဖွင့်ပါ။ `Debug in Agent Builder` ကို ရွေးချယ်ပြီး `F5` နှိပ်၍ MCP ဆာဗာကို Debug စတင်ပါ။
2. Microsoft Foundry Toolkit Agent Builder ကို အသုံးပြုပြီး [ဒီ prompt](../../../../../../../../../../../open_prompt_builder) ဖြင့် ဆာဗာကို စမ်းသပ်ပါ။ ဆာဗာသည် Agent Builder သို့ အလိုအလျောက် ချိတ်ဆက်ပါလိမ့်မည်။
3. `Run` ကို နှိပ်၍ prompt ဖြင့် ဆာဗာကို စမ်းသပ်ပါ။

**အောင်မြင်ပါတယ်**! MCP Client အဖြစ် Agent Builder ကနေ သင့်ဒေသတွင်း Weather MCP Server ကို အောင်မြင်စွာ ပြေးဖြစ်စေပြီးဖြစ်သည်။
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## ပုံစံတွင် ပါဝင်သည့် အချက်များ

| ဖိုလ်ဒါ / ဖိုင် | အကြောင်းအရာ             |
|----------------|--------------------------|
| `.vscode`      | Debug ပြုလုပ်ရန် VSCode ဖိုင်များ |
| `.aitk`        | Microsoft Foundry Toolkit အတွက် ပုံစံဆိုင်ရာကိရိယာများ     |
| `src`          | weather MCP ဆာဗာအတွက် ကုဒ်များ  |

## Weather MCP ဆာဗာကို ဘယ်လို Debug ရမလဲ

> မှတ်ချက်များ-
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) သည် MCP ဆာဗာများကို စမ်းသပ်ရန်နှင့် Debug ပြုလုပ်ရန် အသုံးပြုသော ရုပ်မြင်သံကြား ဖန်တီးသူကိရိယာတစ်ခု ဖြစ်သည်။
> - Debug mode များအားလုံးတွင် breakpoints များ ထည့်သွင်းနိုင်သောကြောင့် tool အကောင်အထည်ဖော်ရေး စာရင်းကိုး code တွင် breakpoints ထည့်နိုင်ပါသည်။

| Debug Mode | ဖေါ်ပြချက် | Debug ပြုလုပ်ရန် အဆင့်များ |
|------------|------------|------------------------------|
| Agent Builder | Microsoft Foundry Toolkit မှတဆင့် Agent Builder တွင် MCP ဆာဗာကို Debug ပြုလုပ်ခြင်း | 1. VS Code Debug panel ကိုဖွင့်ပါ။ `Debug in Agent Builder` ကို ရွေးချယ်ပြီး `F5` နှိပ်၍ MCP ဆာဗာကို Debug စတင်ပါ။<br>2. Microsoft Foundry Toolkit Agent Builder ကို ဖြင့် [ဒီ prompt](../../../../../../../../../../../open_prompt_builder) ဖြင့် ဆာဗာကို စမ်းသပ်ပါ။ ဆာဗာသည် Agent Builder နှင့် အလိုအလျောက် ချိတ်ဆက်သည်။<br>3. `Run` ကို နှိပ်ပြီး prompt ဖြင့် ဆာဗာကို စမ်းသပ်ပါ။ |
| MCP Inspector | MCP Inspector ကို အသုံးပြုပြီး MCP ဆာဗာကို Debug ပြုလုပ်ခြင်း | 1. [Node.js](https://nodejs.org/) ကို ထည့်သွင်းပါ။<br> 2. Inspector ကို ပြင်ဆင်ရန်: `cd inspector` && `npm install` <br> 3. VS Code Debug panel ကို ဖွင့်ပါ။ `Debug SSE in Inspector (Edge)` သို့မဟုတ် `Debug SSE in Inspector (Chrome)` ကို ရွေးပြီး `F5` နှိပ်၍ Debug စတင်ပါ။<br> 4. MCP Inspector ကို Browser တွင် ဖွင့်မည့်အခါ `Connect` ခလုတ်ကို နှိပ်၍ MCP ဆာဗာကို ချိတ်ဆက်ပါ။<br> 5. ထို့နောက် `List Tools` ကိုရွေးချယ်၊ ကိရိယာတစ်ခုရွေး၊ ပါရာမီတာများ ထည့်သွင်းပြီး `Run Tool` ဖြင့် ဆာဗာကုဒ်ကို Debug ပြုလုပ်နိုင်ပါသည်။<br> |

## အပေါ်တန်း Port များနှင့် စိတ်ကြိုက်ပြင်ဆင်မှုများ

| Debug Mode | Ports | ဖော်ပြချက်များ | စိတ်ကြိုက်ပြင်ဆင်မှုများ | မှတ်ချက် |
|------------|-------|------------------|-----------------------------|----------|
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) များကို ရှင်းလင်း၍ ပေါ့တ်များကို ပြောင်းလဲနိုင်သည်။ | မရှိပါ |
| MCP Inspector | 3001 (ဆာဗာ); 5173 နှင့် 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) များကို ပြင်ဆင်၍ ပေါ့တ်များ ပြောင်းလဲနိုင်သည်။ | မရှိပါ |

## တုံ့ပြန်ချက်များ

ဤပုံစံအတွက် သင့်တွင် တုံ့ပြန်ချက်များ သို့မဟုတ် အကြံပြုချက်များ ရှိပါက [Microsoft Foundry Toolkit GitHub repository](https://github.com/microsoft/vscode-ai-toolkit/issues) တွင် Issue တစ်ခု ဖွင့်ပေးပါ။

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ပြောကြားချက်**
ဤစာတမ်းကို AI ဘာသာပြန်ဝန်ဆောင်မှု [Co-op Translator](https://github.com/Azure/co-op-translator) အသုံးပြု၍ ဘာသာပြန်ထားပါသည်။ ကျွန်ုပ်တို့သည် တိကျမှန်ကန်မှုအတွက် ကြိုးပမ်းနေသော်လည်း၊ စက်ကိရိယာဘာသာပြန်ခြင်းများတွင် အမှားများ သို့မဟုတ် မှားယွင်းချက်များ ပါဝင်နိုင်ကြောင်း သတိပြုပါရန် လိုအပ်ပါသည်။ မူလစာတမ်းကို မူရင်းဘာသာဖြင့်သာ ယုံကြည်စိတ်ချရသော အချက်အလက်အဖြစ် သတ်မှတ်သင့်သည်။ အရေးကြီးသည့် သတင်းအချက်အလက်များအတွက် ပရော်ဖက်ရှင်နယ် လူသားဘာသာပြန်သူဝန်ဆောင်မှုကို အကြံပြုပါသည်။ ဤဘာသာပြန်ချက်ကို အသုံးပြုခြင်းမှ ဖြစ်ပေါ်လာသော နားလည်မှုကွာခြားမှုများ သို့မဟုတ် မမှန်ကန်သော အသုံးပြုမှုများအတွက် ကျွန်ုပ်တို့ တာဝန်မခံပါ။
<!-- CO-OP TRANSLATOR DISCLAIMER END -->