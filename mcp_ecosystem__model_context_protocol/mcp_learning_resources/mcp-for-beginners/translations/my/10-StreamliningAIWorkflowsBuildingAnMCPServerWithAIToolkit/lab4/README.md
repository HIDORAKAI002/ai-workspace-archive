# 🐙 Module 4: Practical MCP Development - Custom GitHub Clone Server

![Duration](https://img.shields.io/badge/Duration-30_minutes-blue?style=flat-square)
![Difficulty](https://img.shields.io/badge/Difficulty-Intermediate-orange?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-Custom%20Server-purple?style=flat-square&logo=github)
![VS Code](https://img.shields.io/badge/VS%20Code-Integration-blue?style=flat-square&logo=visualstudiocode)
![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Agent%20Mode-green?style=flat-square&logo=github)

> **⚡ အမြန်စတင်ခြင်း:** ၃၀ မိနစ်အတွင်း GitHub repository cloning နှင့် VS Code ပေါင်းစည်းမှုကို အလိုအလျောက်လုပ်ဆောင်ပေးနိုင်သည့် production-ready MCP server တစ်ခုကို တည်ဆောက်ပါ!

## 🎯 သင်ယူရမည့် ရည်မှန်းချက်များ

ဤလက်တွေ့လုပ်ငန်းအဆုံးသတ်သည့်အခါတွင် သင်သည်:

- ✅ အလုပ်တွင်အသုံးပြုနိုင်သော custom MCP server တစ်ခုကို ဖန်တီးနိုင်မည်
- ✅ MCP မှတဆင့် GitHub repository cloning လုပ်ဆောင်ချက်ကို အကောင်အထည်ဖော်နိုင်မည်
- ✅ Custom MCP server များကို VS Code နှင့် Agent Builder တွင် ပေါင်းစည်းမည်
- ✅ GitHub Copilot Agent Mode ကို custom MCP tools နှင့် အသုံးပြုနိုင်မည်
- ✅ Production ပတ်ဝန်းကျင်တွင် custom MCP server များကို စမ်းသပ် တပ်ဆင်နိုင်မည်

## 📋 လိုအပ်ချက်များ

- Labs 1-3 (MCP အခြေခံနှင့် တိုးတက်သောဖွံ့ဖြိုးမှုများ) ပြီးစီးပြီးဖြစ်ရမည်
- GitHub Copilot စာရင်းသွင်းခြင်း ([အခမဲ့ စာရင်းသွင်းမှု ရနိုင်သည်](https://github.com/github-copilot/signup))
- Microsoft Foundry Toolkit နှင့် GitHub Copilot extension များပါရှိသော VS Code
- Git CLI တပ်ဆင်ပြီး ဖြည့်စွက်ထားရှိရမည်

## 🏗️ စီမံကိန်းအနှုတ်ချုပ်

### **လက်တွေ့ ဖွံ့ဖြိုးရေး စိန်ခေါ်မှု**
Developer များအနေဖြင့် GitHub repositories များကို clone ပြီး VS Code သို့မဟုတ် VS Code Insiders တွင်ဖွင့်ရန် မကြာခဏလိုအပ်ပါတယ်။ ဤ လုပ်ငန်းစဉ်ကို လက်မှတ်ဖြင့် ဆောင်ရွက်ရန် လိုအပ်သည်မှာ -
1. terminal/command prompt ကိုဖွင့်ခြင်း
2. လိုချင်သော ဖိုင်လမ်းကြောင်းသို့သွားရောက်ခြင်း
3. `git clone` command အား chạyခြင်း
4. clone လုပ်ထားသောဖိုင်လမ်းကြောင်းတွင် VS Code ကိုဖွင့်ခြင်း

**MCP ဖြေရှင်းချက်က ဤလျှောက်လုပ်မှုအား အတိအကျ တစ်ခုတည်းသော command တစ်ခုသို့ ပြေးအောင် အလွယ်တကူ ပြုလုပ်ပေးပါသည်!**

### **သင်တည်ဆောက်မည့်အရာ**
**GitHub Clone MCP Server** (`git_mcp_server`) သည် အောက်ပါအချက်များကို ပံ့ပိုးပေးသည် -

| လက္ခဏာ | ဖော်ပြချက် | အကျိုးထူး |
|---------|-------------|---------|
| 🔄 **Smart Repository Cloning** | GitHub repos များကို ပြန်တိုးစစ်ဆေးကာ clone လုပ်ခြင်း | အလိုအလျောက် အမှားရှာဖွေမှု |
| 📁 **Intelligent Directory Management** | ဖိုင်များကို လုံခြုံစွာ စစ်ဆေးနှင့် ဖန်တီးခြင်း | ဖိုင်များ မပယ်ဖျက်ဖောက်ပြန်မှုကို ကာကွယ်ပေးသည် |
| 🚀 **Cross-Platform VS Code Integration** | VS Code/Insiders တွင် project များဖွင့်ပေးခြင်း | လုပ်ငန်းစဉ် ချောမွေ့စေရန် |
| 🛡️ **Robust Error Handling** | အင်တာနက်၊ ခွင့်ပြုချက်၊ လမ်းကြောင်းပြဿနာများကို ကိုင်တွယ်နိုင်မှု | Production-ready ယုံကြည်စိတ်ချရမှု |

---

## 📖 အဆင့်တစ်ဆင့် လုပ်ဆောင်ခြင်း

### အဆင့် ၁: Agent Builder တွင် GitHub Agent ဖန်တီးခြင်း

1. Microsoft Foundry Toolkit extension မှတဆင့် **Agent Builder ကို ဖွင့်ပါ**
2. အောက်ပါ configuration ဖြင့် **အေးဂျင့်အသစ်တစ်ခု ဖန်တီးပါ:**
   ```
   Agent Name: GitHubAgent
   ```

3. **Custom MCP server ကို စတင်ဆောက်ရန်:**
   - **Tools** → **Add Tool** → **MCP Server** သို့ သွားပါ
   - **"Create A new MCP Server"** ကိုရွေးချယ်ပါ
   - ကျယ်ပြန့်စွာ အသုံးပြုနိုင်သော **Python template** ကို ရွေးပါ
   - **Server Name:** `git_mcp_server`

### အဆင့် ၂: GitHub Copilot Agent Mode ဖြင့် ဆက်ဆံခြင်း

1. VS Code တွင် GitHub Copilot ကို ဖွင့်ပါ (Ctrl/Cmd + Shift + P → "GitHub Copilot: Open")
2. Copilot အပြင်တွင် **Agent Model ကို ရွေးချယ်ပါ**
3. ပိုမိုအတိအကျ reasoning များစွာလုပ်ဆောင်နိုင်သော **Claude 3.7 model** ကို ရွေးချယ်ပါ
4. Tool များသုံးရန်အတွက် **MCP ပေါင်းစည်းမှုကို ဖွင့်ပါ**

> **💡 အသုံးချရန် အကြံပေးချက်:** Claude 3.7 သည် ဖွံ့ဖြိုးမှု လုပ်ငန်းစဉ်များနှင့် အမှား ကိုင်တွယ်နည်းများကို ပိုမိုနက်ရှိုင်းစွာ နားလည်ပေးတတ်သည်။

### အဆင့် ၃: MCP Server အဓိက လုပ်ဆောင်ချက်များ ကို အကောင်အထည်ဖော်ခြင်း

**GitHub Copilot Agent Mode အသုံးပြု၍ အောက်ပါ prompt အသေးစိတ်ကို အသုံးပြုပြီး ဖန်တီးပါ:**

```
Create two MCP tools with the following comprehensive requirements:

🔧 TOOL A: clone_repository
Requirements:
- Clone any GitHub repository to a specified local folder
- Return the absolute path of the successfully cloned project
- Implement comprehensive validation:
  ✓ Check if target directory already exists (return error if exists)
  ✓ Validate GitHub URL format (https://github.com/user/repo)
  ✓ Verify git command availability (prompt installation if missing)
  ✓ Handle network connectivity issues
  ✓ Provide clear error messages for all failure scenarios

🚀 TOOL B: open_in_vscode
Requirements:
- Open specified folder in VS Code or VS Code Insiders
- Cross-platform compatibility (Windows/Linux/macOS)
- Use direct application launch (not terminal commands)
- Auto-detect available VS Code installations
- Handle cases where VS Code is not installed
- Provide user-friendly error messages

Additional Requirements:
- Follow MCP 1.9.3 best practices
- Include proper type hints and documentation
- Implement logging for debugging purposes
- Add input validation for all parameters
- Include comprehensive error handling
```

### အဆင့် ၄: MCP Server ကို စမ်းသပ်ခြင်း

#### 4a. Agent Builder တွင် စမ်းသပ်ခြင်း

1. Agent Builder အတွက် debug configuration ကို ဖွင့်ပါ
2. အောက်ပါ system prompt ဖြင့် အေးဂျင့် Configure လုပ်ပါ:

```
SYSTEM_PROMPT:
You are my intelligent coding repository assistant. You help developers efficiently clone GitHub repositories and set up their development environment. Always provide clear feedback about operations and handle errors gracefully.
```

3. အသုံးပြုသူအခြေအနေများအတိုင်း စမ်းသပ်ပါ:

```
USER_PROMPT EXAMPLES:

Scenario : Basic Clone and Open
"Clone {Your GitHub Repo link such as https://github.com/kinfey/GHCAgentWorkshop
 } and save to {The global path you specify}, then open it with VS Code Insiders"
```

![Agent Builder Testing](../../../../translated_images/my/DebugAgent.81d152370c503241.webp)

**မျှော်မှန်းရလဒ်များ:**
- ✅ လမ်းကြောင်းအတည်ပြုချက်နှင့်အတူ စတိုင်လ်စနစ် cloning အောင်မြင်မှု
- ✅ VS Code ကို အလိုအလျောက် ဖွင့်ခြင်း
- ✅ ပျက်ကွက်မှုများအတွက် ထင်ရှားသော အမှားစာလုံးများ
- ✅ အထူးအခြေအနေများကို မှန်ကန်စွာ ကိုင်တွယ်နိုင်မှု

#### 4b. MCP Inspector တွင် စမ်းသပ်ခြင်း


![MCP Inspector Testing](../../../../translated_images/my/DebugInspector.eb5c95f94c69a8ba.webp)

---



**🎉 သင်ပြုလုပ်နိုင်ပြီ!** လက်တွေ့အသုံးပြုနိုင်ပြီး production-ready MCP server တစ်ခုကို ဖြေရှင်းသူအနေဖြင့် အောင်မြင်စွာ စတင်တည်ဆောက်လိုက်ပါပြီ။ သင်၏ custom GitHub clone server သည် MCP ၏စွမ်းအားကို developer များအတွက် စီမံခန့်ခွဲမှုများကို လွယ်ကူအောင် ပြုလုပ်ပေးနိုင်မှုကို ပြသနေပါသည်။

### 🏆 ရရှိထားသည့်အောင်မြင်မှုများ:
- ✅ **MCP Developer** - Custom MCP server ကို ဖန်တီးခဲ့သူ
- ✅ **Workflow Automator** - ဖွံ့ဖြိုးရေး လုပ်ငန်းစဉ်များ စနစ်တကျ လွယ်ကူစေရန်
- ✅ **Integration Expert** - ဖွံ့ဖြိုးရေး ကိရိယာများစွာ ပေါင်းစည်းနိုင်သူ
- ✅ **Production Ready** - deploy ချနိုင်သော ဖြေရှင်းချက်များ တည်ဆောက်သူ

---

## 🎓 သင်တန်းပြီးဆုံးခြင်း: Model Context Protocol နှင့် သင်၏ ခရီးစဉ်

**လေးစားရပါသော သင်တန်းဝင်များ,**

Model Context Protocol သင်တန်း ၄ Module အားလုံးပြီးဆုံးခြင်းအတွက် ဂုဏ်ယူပါသည်! Microsoft Foundry Toolkit ၏ အခြေခံစတင်လေ့လာမှစ၍ လက်တွေ့အသုံးပြုနိုင်သော production-ready MCP server များဖန်တီးနိုင်အောင် ချဲ့ထွင်နိုင်ခဲ့ပါသည်။

### 🚀 သင်၏ သင်ယူရေး လမ်းကြောင်း အကျဉ်းချုံး:

**[Module 1](../lab1/README.md)**: Microsoft Foundry Toolkit အခြေခံများ၊ model စမ်းသပ်မှုနှင့် ပထမဆုံး AI agent ဖန်တီးခြင်း ကို စတင်လေ့လာခဲ့သည်။

**[Module 2](../lab2/README.md)**: MCP အဆောက်အအုံ၊ Playwright MCP ပေါင်းစည်းမှုနှင့် ပထမဆုံး browser automation agent တိုု့ကို ဖွံ့ဖြိုးခဲ့သည်။

**[Module 3](../lab3/README.md)**: Weather MCP server အသုံးပြုပြီး custom MCP server ဖန်တီးခြင်းနှင့် debugging ကိရိယာများ ကျွမ်းကျင်မှု ရရှိခဲ့သည်။

**[Module 4](../lab4/README.md)**: လက်တွေ့ GitHub repository workflow automation ကိရိယာ ဖန်တီးခြင်းအပိုင်းတွင် မိမိကွာတာတွေကို စတင်အသုံးချနိုင်ခဲ့သည်။

### 🌟 သင်ယူပြီးအောင်မြင်ခဲ့သူများ:

- ✅ **Microsoft Foundry Toolkit ကမ္ဘာပတ်လည်**: Models, agents, ပေါင်းစည်းနည်းများ
- ✅ **MCP Architecture**: Client-server ဒီဇိုင်း၊ ထွက်သွားမှု protocols နှင့် လုံခြုံရေး
- ✅ **Developer Tools**: Playground မှ Inspector တိုင်အောင် နှင့် production deployment အထိ
- ✅ **Custom Development**: ကိုယ်ပိုင် MCP server များ ဖန်တီး၊ စမ်းသပ်နှင့် တပ်ဆင်နိုင်မှု
- ✅ **လက်တွေ့လျှောက်လွှာများ**: AI ဖြင့် လုပ်ငန်းစဉ်စိန်ခေါ်မှုများကို ဖြေရှင်းနိုင်မှု

### 🔮 နောက်တစ်ဆင့်များ

1. **ကိုယ်ပိုင် MCP server တည်ဆောက်ပါ**: ကိုယ်ပိုင် workflow များကို အလိုအလျောက်လုပ်ဆောင်ရန်
2. **MCP ကွန်ယက်တွင် ပူးပေါင်းပါ**: မိတ်ဖက်များနှင့် မှတဆင့် မျှဝေပေးပါ
3. **တိုးတက်ထပ်ဆောင်း ပေါင်းစည်းမှု လေ့လာပါ**: MCP servers များကို စီးပွားရေးစနစ်များနှင့် ချိတ်ဆက်ရန်
4. **Open Source တွင် ပါဝင်ပါ**: MCP ကိရိယာများနှင့် စာရွက်စာတမ်းများ တိုးတက်စေရန် သူများအား ကူညီပါ

သတိပြုပါ - ဤသင်တန်းမှာ စတင်အဆင့်သာဖြစ်ပြီး Model Context Protocol ကမ္ဘာကြီးသည် အလွန်မြန်မြန်ပြောင်းလဲနေပါသည်၊ သင်သည် AI-အခြေခံ ဖွံ့ဖြိုးရေး ကိရိယာများ၏မိတ်ဆက်တိုးတက်မှုမောင်းသူတစ်ဦးခေါ်ယူရန် ပြင်ဆင်ပြီး ဖြစ်ပါသည်။

**တက်ကြွစွာ ပါဝင်ပေးမှုနှင့် သင်ယူမှုအတွက် ကျေးဇူးအထူးတင်ရှိပါသည်!**

သင်တန်းသည် သင်၏ ဖွံ့ဖြိုးရေး ခရီးစဉ်တွင် AI ကိရိယာများနှင့် အဆက်အသွယ်ပြုလုပ်နည်းကို ပြောင်းလဲပေးမည့် အတွေးအမြင်များ လှည့်ဖြူးပေးသလိမ့်မည်ဟု မျှော်လင့်ပါသည်။

**Coding ကောင်းသောနေ့များဖြစ်ပါစေ!**

---

## နောက်တစ်ဆင့်

Module 10 အတွက် labs အားလုံးပြီးစီးခြင်းအတွက် ဂုဏ်ယူပါသည်!

- နောက်သို့: [Module 10 Overview](../README.md)
- ဆက်လက် လုပ်ဆောင်ရန်: [Module 11: MCP Server Hands-On Labs](../../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ပြောကြားချက်**
ဤစာတမ်းကို AI ဘာသာပြန်ဝန်ဆောင်မှု [Co-op Translator](https://github.com/Azure/co-op-translator) အသုံးပြု၍ ဘာသာပြန်ထားပါသည်။ ကျွန်ုပ်တို့သည် တိကျမှန်ကန်မှုအတွက် ကြိုးပမ်းနေသော်လည်း၊ စက်ကိရိယာဘာသာပြန်ခြင်းများတွင် အမှားများ သို့မဟုတ် မှားယွင်းချက်များ ပါဝင်နိုင်ကြောင်း သတိပြုပါရန် လိုအပ်ပါသည်။ မူလစာတမ်းကို မူရင်းဘာသာဖြင့်သာ ယုံကြည်စိတ်ချရသော အချက်အလက်အဖြစ် သတ်မှတ်သင့်သည်။ အရေးကြီးသည့် သတင်းအချက်အလက်များအတွက် ပရော်ဖက်ရှင်နယ် လူသားဘာသာပြန်သူဝန်ဆောင်မှုကို အကြံပြုပါသည်။ ဤဘာသာပြန်ချက်ကို အသုံးပြုခြင်းမှ ဖြစ်ပေါ်လာသော နားလည်မှုကွာခြားမှုများ သို့မဟုတ် မမှန်ကန်သော အသုံးပြုမှုများအတွက် ကျွန်ုပ်တို့ တာဝန်မခံပါ။
<!-- CO-OP TRANSLATOR DISCLAIMER END -->