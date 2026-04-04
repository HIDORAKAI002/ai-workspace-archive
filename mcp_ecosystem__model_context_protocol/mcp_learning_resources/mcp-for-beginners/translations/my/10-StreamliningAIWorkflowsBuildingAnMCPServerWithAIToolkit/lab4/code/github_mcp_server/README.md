# ရာသီဥတုပြင်ဆင်မည့် MCP ဆာဗာ

ဤသည်မှာ မော့ခ်တုံ့ပြန်မှုများနှင့်အတူ ရာသီဥတု ကိရိယာများကို အကောင်အထည်ဖော်ထားသော Python ဖြင့် ရေးသားထားသော MCP ဆာဗာ နမူနာ ဖြစ်သည်။ သင်၏ ကိုယ်ပိုင် MCP ဆာဗာအတွက် ဦးတည်ရာအဖြစ် အသုံးပြုနိုင်ပါသည်။ အောက်ဖော်ပြပါ လက္ခဏာများ ပါဝင်သည်။

- **ရာသီဥတု ကိရိယာ**: ပေးထားသော တည်နေရာအပေါ် မော့ခ်ထားသော ရာသီဥတု အချက်အလက်များ ပေးသည့် ကိရိယာ။
- **Git Clone Tool**: Git Repository ကို သတ်မှတ်ထားသော ဖိုလ်ဒါတစ်ခုသို့ ကလုံလုပ်ပေးသည်။
- **VS Code Open Tool**: ဖိုလ်ဒါကို VS Code သို့မဟုတ် VS Code Insiders တွင် ဖွင့်ပေးသည်။
- **Agent Builder သို့ ချိတ်ဆက်ခြင်း**: MCP ဆာဗာကို စမ်းသပ်မှုနှင့် အမှားရှာဖွေရန်အတွက် Agent Builder နှင့် ချိတ်ဆက်နိုင်သော လက္ခဏာ။
- **[MCP Inspector](https://github.com/modelcontextprotocol/inspector) တွင် အမှားရှာဖွေနိုင်ခြင်း**: MCP Server ကို MCP Inspector အသုံးပြု၍ ဒီဘတ်လုပ်နိုင်သော လက္ခဏာ။

## Weather MCP Server နမူနာနှင့် စတင်ခြင်း

> **လိုအပ်ချက်များ**
>
> သင်၏ ဒေဗလာ စက်တွင် MCP Server ကို စတင်ရန် အောက်ပါ အရာများ လိုအပ်ပါသည်။
>
> - [Python](https://www.python.org/)
> - [Git](https://git-scm.com/) (git_clone_repo ကိရိယာအတွက် လိုအပ်သည်)
> - [VS Code](https://code.visualstudio.com/) သို့မဟုတ် [VS Code Insiders](https://code.visualstudio.com/insiders/) (open_in_vscode ကိရိယာအတွက် လိုအပ်သည်)
> - (*ရွေးချယ်စရာ - uv ကို ဦးစားပေးပါက*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## ပတ်ဝန်းကျင် ပြင်ဆင်ခြင်း

ဤပရောဂျက်အတွက် ပတ်ဝန်းကျင်ပြင်ဆင်ရာတွင် နည်းလမ်း ၂ မျိုးရှိပြီး သင့်စိတ်ကြိုက်အရ ရွေးချယ်နိုင်ပါသည်။

> မှတ်ချက်- Virtual Environment ဖန်တီးပြီးနောက် virtual environment မှ python ကိုအသုံးပြုမှု သေချာရန် VSCode သို့ Terminal ကို ပြန်ဖွင့်ပါ။

| နည်းလမ်း | အဆင့်များ |
| -------- | ---------- |
| `uv` အသုံးပြုခြင်း | 1. Virtual environment ဖန်တီးရန်: `uv venv` <br>2. VSCode Command "Python: Select Interpreter" ကို run ပြီး ဖန်တီးထားသော virtual environment ၏ python ကို ရွေးချယ်ပါ <br>3. အားလုံးသော dependency များ (dev dependencies ပါဝင်သည်) ကို install ဆောင်ရွက်ရန်: `uv pip install -r pyproject.toml --extra dev` |
| `pip` အသုံးပြုခြင်း | 1. Virtual environment ဖန်တီးရန်: `python -m venv .venv` <br>2. VSCode Command "Python: Select Interpreter" run ပြီး ဖန်တီးထားသော virtual environment ၏ python ကို ရွေးချယ်ပါ<br>3. အားလုံးသော dependency များ (dev dependencies ပါဝင်သည်) ကို install ဆောင်ရွက်ရန်: `pip install -e .[dev]` |

ပတ်ဝန်းကျင် ပြင်ဆင်ပြီးနောက် သင့်ဒေဗလာ စက်ပေါ်တွင် Agent Builder ကို MCP Client အဖြစ် အသုံးပြု၍ ဆာဗာကို လည်ပတ်နိုင်ပါသည်။
1. VS Code ၏ Debug panel ကို ဖွင့်ပါ။ `Debug in Agent Builder` ကို ရွေးပြီး MCP ဆာဗာကို ဒီဘတ်ရန် `F5` သို့မဟုတ် စတင်ပါ။
2. AI Toolkit Agent Builder ဖြင့် အောက်ပါ prompt ဖြင့် ဆာဗာကို စမ်းသပ်ပါ။ ဆာဗာသည် Agent Builder နှင့် အလိုအလျောက် ချိတ်ဆက်မည်။
3. `Run` ကို နှိပ်ပြီး prompt ဖြင့် စမ်းသပ်ပါ။

**အဖုပ်စီးချီးခြင်း**! သင်သည် Agent Builder သုံးပြီး MCP Client အဖြစ် သင့်ဒေဗလာစက်တွင် Weather MCP Server ကို အောင်မြင်စွာ လည်ပတ်နိုင်ပါပြီ။
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## မူလနမူနာတွင် ပါဝင်သော အရာများ

| ဖိုလ်ဒါ / ဖိုင် | ပါဝင်သည်များ                             |
| -------------- | ---------------------------------------- |
| `.vscode`      | VSCode အတွက် ဒီဘတ်ဖိုင်များ             |
| `.aitk`        | AI Toolkit အတွက် ဖွဲ့စည်းမှုများ       |
| `src`          | ရာသီဥတု MCP ဆာဗာအတွက် မူရင်းကုဒ်များ |

## Weather MCP Server အတွက် ဒီဘတ်လုပ်နည်း

> မှတ်ချက်များ -
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) သည် MCP ဆာဗာများကို စမ်းသပ်ရသော ကြည့်ရှုသူနှင့် ဒီဘတ်ကိရိယာဖြစ်သည်။
> - ဒီဘတ်မုဒ်အားလုံးက ပြတ်တောက်ချက်များ (breakpoints) ကို ထောက်ခံပေးလျှင် tool implementation ကုဒ်တွင် ပြတ်တောက်ချက် ထည့်နိုင်သည်။

## ရနိုင်သော ကိရိယာများ

### ရာသီဥတု ကိရိယာ
`get_weather` tool သည် သတ်မှတ်ထားသော တည်နေရာအတွက် မော့ခ်ထားသော ရာသီဥတု အချက်အလက်များပေးသည်။

| ပြုံးလက္ခဏာ | အမျိုးအစား | ဖော်ပြချက်                      |
| ------------ | --------- | ----------------------------- |
| `location`   | string    | ရာသီဥတု သိချင်သော တည်နေရာ (ဥပမာ- မြို့အမည်၊ ပြည်နယ်၊ ဒေသအနေအထား) |

### Git Clone Tool
`git_clone_repo` ကိရိယာသည် Git Repository ကို သတ်မှတ်ထားသော ဖိုလ်ဒါသို့ ကလုံလုပ်ပေးသည်။

| ပြုံးလက္ခဏာ       | အမျိုးအစား | ဖော်ပြချက်                            |
| ----------------- | --------- | ---------------------------------- |
| `repo_url`        | string    | ကလုံလုပ်မည့် Git Repository ၏ URL |
| `target_folder`   | string    | Repository ကို ကလုံလုပ်မည့် ဖိုလ်ဒါလမ်းကြောင်း |

ကိရိယာမှ တုံ့ပြန်ချက်အနေနဲ့ JSON အချက်အလက်တစ်ခုကို ပြန်လည်ပေးသည် -
- `success`: လုပ်ဆောင်မှု ဂုဏ်သတ္တိ Boolean (အောင်မြင်/မအောင်မြင်)
- `target_folder` သို့မဟုတ် `error`: ကလုံပြုလုပ်ပြီးဖိုလ်ဒါလမ်းကြောင်း သို့မဟုတ် အမှားသတင်း

### VS Code Open Tool
`open_in_vscode` ကိရိယာသည် ဖိုလ်ဒါကို VS Code သို့ VS Code Insiders များဖြင့် ဖွင့်ပေးသည်။

| ပြုံးလက္ခဏာ       | အမျိုးအစား     | ဖော်ပြချက်                                  |
| ----------------- | ------------- | ----------------------------------------- |
| `folder_path`     | string        | ဖိုလ်ဒါ ဖွင့်ရန် လမ်းကြောင်း                   |
| `use_insiders`    | boolean (စိတ်ကြိုက်) | သာမာန် VS Code ထက် VS Code Insiders ကို အသုံးပြုမည့်ကိစ္စ |

ကိရိယာမှ JSON ပုံစံတုံ့ပြန်မှု -
- `success`: လုပ်ဆောင်မှု အောင်မြင်/မအောင်မြင် Boolean
- `message` သို့မဟုတ် `error`: အတည်ပြုစာတမ်း သို့မဟုတ် အမှားစာတမ်း

| ဒီဘတ်မုဒ် | ဖော်ပြချက် | ဒီဘတ်လုပ်နည်း |
| ---------- | --------- | -------------- |
| Agent Builder | AI Toolkit မှတဆင့် Agent Builder တွင် MCP ဆာဗာကို ဒီဘတ်။ | 1. VS Code Debug panel ကိုဖွင့်ပါ။ `Debug in Agent Builder` ကိုရွေးပြီး F5 နှိပ်၍ MCP server ကို ဒီဘတ်စတင်ပါ။<br>2. AI Toolkit Agent Builder ကို သုံးပြီး [prompt](../../../../../../../../../../../open_prompt_builder)ဖြင့် စမ်းသပ်သည်။ ဆာဗာသည် Agent Builder နှင့် အလိုအလျောက်ချိတ်ဆက်မည်။ <br>3. `Run` ကိုနှိပ်၍ prompt ဖြင့် စမ်းသပ်ပါ။ |
| MCP Inspector | MCP Inspector ကို အသုံးပြု၍ MCP Server ကို ဒီဘတ်။ | 1. [Node.js](https://nodejs.org/) တပ်ဆင်ပါ။<br> 2. Inspector ချိန်ညှိရန်: `cd inspector` && `npm install` <br> 3. VS Code Debug panel တွင် `Debug SSE in Inspector (Edge)` သို့မဟုတ် `Debug SSE in Inspector (Chrome)` ကို ရွေးချယ်ပါ။ ဒီဘတ်စတင်ရန် F5 နှိပ်ပါ။<br> 4. MCP Inspector browser တွင် ဖွင့်သောအခါ `Connect` ခလုတ်ကိုနှိပ်၍ MCP server ကို ချိတ်ဆက်ပါ။<br> 5. ထို့နောက် `List Tools` ကိုရွေး၊ ကိရိယာကို ရွေးနှင့် parameter များထည့်သွင်းပြီး `Run Tool` ဖြင့် server code ကို ဒီဘတ်နိုင်သည်။<br> |

## မူကွဲပေါ်နဲ့ ဆက်စပ်သော Port များနှင့် စိတ်ကြိုက်ပြင်ဆင်မှုများ

| ဒီဘတ်မုဒ် | Port များ | ဖော်ပြချက်များ | မိမိအလိုအလျောက်ပြင်ဆင်မှု | မှတ်ချက် |
| ---------- | --------- | ------------- | -------------------------- | -------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) တွင် Port များ ပြင်ဆင်နိုင်သည်။ | နားလည်ရန် မလိုအပ်ပါ |
| MCP Inspector | 3001 (Server); 5173 နှင့် 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) တွင် Port များ ပြင်ဆင်နိုင်သည်။ | နားလည်ရန် မလိုအပ်ပါ |

## အသုံးပြုသူဆိုင်ရာ မှတ်ချက်များ

ဤနမူနာအပေါ် သင့်တွင် အကြံပြုချက်များ သို့မဟုတ် တိုးတက်မြှင့်တင်ရေး အကြံပြုချက်များရှိပါက [AI Toolkit GitHub Repository](https://github.com/microsoft/vscode-ai-toolkit/issues) တွင် issue ဖွင့်ပေးပါ။

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**စာသတိပေးချက်**  
ဤစာရွက်စာတမ်းကို AI ဘာသာပြန်ခြင်းဆိုင်ရာ ဝန်ဆောင်မှုဖြစ်သည့် [Co-op Translator](https://github.com/Azure/co-op-translator) ကို အသုံးပြု၍ ဘာသာပြန်ထားပါသည်။ တိကျမှုကို ကြိုးစားပြုလုပ်ထားပေမယ့် အလိုအလျောက် ဘာသာပြန်ချက်တွင် အမှားများ သို့မဟုတ် မှားယွင်းချက်များ ပါဝင်နိုင်ကြောင်း သတိပြုပါရန် စောင့်ကြည့်အပ်ပါသည်။ မူရင်းစာရွက်စာတမ်းကို မူရင်းဘာသာဖြင့် အတည်ရှိသူ အရင်းအSOURCE အဖြစ် ယူဆရမည်ဖြစ်သည်။ အရေးပါသော အချက်အလက်များအတွက်တော့ ပရော်ဖက်ရှင်နယ် လူ့ဘာသာပြန်ထောက်ခံချက်ကို လိုအပ်သည်။ ဤဘာသာပြန်ချက်ကို အသုံးပြုမှုကြောင့် ဖြစ်ပေါ်နိုင်သည့် မိန့်ခွန်းသေချာမှု၊ မှားယွင်းဖွယ်ရာအကြောင်းအရာများအတွက် ကျနော်တို့သည် တာဝန်မခံပါ။
<!-- CO-OP TRANSLATOR DISCLAIMER END -->