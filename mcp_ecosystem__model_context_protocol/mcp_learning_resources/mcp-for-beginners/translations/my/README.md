![MCP-for-beginners](../../translated_images/my/mcp-beginners.2ce2b317996369ff.webp) 

[![GitHub contributors](https://img.shields.io/github/contributors/microsoft/mcp-for-beginners.svg)](https://GitHub.com/microsoft/mcp-for-beginners/graphs/contributors)
[![GitHub issues](https://img.shields.io/github/issues/microsoft/mcp-for-beginners.svg)](https://GitHub.com/microsoft/mcp-for-beginners/issues)
[![GitHub pull-requests](https://img.shields.io/github/issues-pr/microsoft/mcp-for-beginners.svg)](https://GitHub.com/microsoft/mcp-for-beginners/pulls)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

[![GitHub watchers](https://img.shields.io/github/watchers/microsoft/mcp-for-beginners.svg?style=social&label=Watch)](https://GitHub.com/microsoft/mcp-for-beginners/watchers)
[![GitHub forks](https://img.shields.io/github/forks/microsoft/mcp-for-beginners.svg?style=social&label=Fork)](https://GitHub.com/microsoft/mcp-for-beginners/fork)
[![GitHub stars](https://img.shields.io/github/stars/microsoft/mcp-for-beginners?style=social&label=Star)](https://GitHub.com/microsoft/mcp-for-beginners/stargazers)


[![Microsoft Foundry Discord](https://dcbadge.limes.pink/api/server/nTYy5BXMWG)](https://discord.gg/nTYy5BXMWG)

ယခုအရင်းအမြစ်များကို အသုံးပြုခြင်းကို စတင်ရန် ဒီအဆင့်များကိုလိုက်နာပါ။
1. **Repository ကို Fork လုပ်ပါ**: [![GitHub forks](https://img.shields.io/github/forks/microsoft/mcp-for-beginners.svg?style=social&label=Fork)](https://GitHub.com/microsoft/mcp-for-beginners/fork)ကို နှိပ်ပါ
2. **Repository ကို Clone လုပ်ပါ**:   `git clone https://github.com/microsoft/mcp-for-beginners.git`
3. **Join The** [![Microsoft Foundry Discord](https://dcbadge.limes.pink/api/server/nTYy5BXMWG)](https://discord.gg/nTYy5BXMWG)


### 🌐 ဘာသာစကားစုံ အထောက်အပံ့

#### GitHub Action (အလိုအလျောက်နှင့် အမြဲတမ်းနောက်ဆုံးအခြေအနေရှိ) မှတဆင့် ပံ့ပိုးသည်

<!-- CO-OP TRANSLATOR LANGUAGES TABLE START -->
[Arabic](../ar/README.md) | [Bengali](../bn/README.md) | [Bulgarian](../bg/README.md) | [Burmese (Myanmar)](./README.md) | [Chinese (Simplified)](../zh-CN/README.md) | [Chinese (Traditional, Hong Kong)](../zh-HK/README.md) | [Chinese (Traditional, Macau)](../zh-MO/README.md) | [Chinese (Traditional, Taiwan)](../zh-TW/README.md) | [Croatian](../hr/README.md) | [Czech](../cs/README.md) | [Danish](../da/README.md) | [Dutch](../nl/README.md) | [Estonian](../et/README.md) | [Finnish](../fi/README.md) | [French](../fr/README.md) | [German](../de/README.md) | [Greek](../el/README.md) | [Hebrew](../he/README.md) | [Hindi](../hi/README.md) | [Hungarian](../hu/README.md) | [Indonesian](../id/README.md) | [Italian](../it/README.md) | [Japanese](../ja/README.md) | [Kannada](../kn/README.md) | [Khmer](../km/README.md) | [Korean](../ko/README.md) | [Lithuanian](../lt/README.md) | [Malay](../ms/README.md) | [Malayalam](../ml/README.md) | [Marathi](../mr/README.md) | [Nepali](../ne/README.md) | [Nigerian Pidgin](../pcm/README.md) | [Norwegian](../no/README.md) | [Persian (Farsi)](../fa/README.md) | [Polish](../pl/README.md) | [Portuguese (Brazil)](../pt-BR/README.md) | [Portuguese (Portugal)](../pt-PT/README.md) | [Punjabi (Gurmukhi)](../pa/README.md) | [Romanian](../ro/README.md) | [Russian](../ru/README.md) | [Serbian (Cyrillic)](../sr/README.md) | [Slovak](../sk/README.md) | [Slovenian](../sl/README.md) | [Spanish](../es/README.md) | [Swahili](../sw/README.md) | [Swedish](../sv/README.md) | [Tagalog (Filipino)](../tl/README.md) | [Tamil](../ta/README.md) | [Telugu](../te/README.md) | [Thai](../th/README.md) | [Turkish](../tr/README.md) | [Ukrainian](../uk/README.md) | [Urdu](../ur/README.md) | [Vietnamese](../vi/README.md)

> **ဒေသတွင်းတွင် Clone လုပ်ရန်နှစ်သက်ပါသလား?**
>
> ဒီ repository တွင် ဘာသာစကား 50+ ပြီးနောက် ထည့်သောဘာသာပြန်စနစ်များပါဝင်သည်၊ ယင်းကြောင့် ဒေါင်းလုဒ်အရွယ်အစား တိုးလာသည်။ ဘာသာပြန်ချက်များ မပါဘဲ clone လုပ်ရန် sparse checkout ကို သုံးပါ။
>
> **Bash / macOS / Linux:**
> ```bash
> git clone --filter=blob:none --sparse https://github.com/microsoft/mcp-for-beginners.git
> cd mcp-for-beginners
> git sparse-checkout set --no-cone '/*' '!translations' '!translated_images'
> ```
>
> **CMD (Windows):**
> ```cmd
> git clone --filter=blob:none --sparse https://github.com/microsoft/mcp-for-beginners.git
> cd mcp-for-beginners
> git sparse-checkout set --no-cone "/*" "!translations" "!translated_images"
> ```
>
> ဒါက သင့်ကို ပိုမြန်ဆန်သော ဒေါင်းလုဒ်ဖြင့် အကုန်လုံးလိုအပ်သည့် အရာများကိုပေးပါသည်။
<!-- CO-OP TRANSLATOR LANGUAGES TABLE END -->

# 🚀 Model Context Protocol (MCP) သင်ရိုးညွှန်းတမ်း စတင်လိုသူများအတွက်

## **C#, Java, JavaScript, Rust, Python, နှင့် TypeScript တွင် ကိုယ်တိုင် လက်တွေ့ ဥပမာများဖြင့် MCP ကို လေ့လာပါ**

## 🧠 Model Context Protocol သင်ရိုးညွှန်းတမ်းအကြောင်းအနှီးချုပ်
Model Context Protocol အတွက် သင်၏ခရီးစဉ်မှ ကြိုဆိုပါတယ်! AI အက်ပလီကေးရှင်းများသည် ဘယ်လိုကိရိယာနှင့် ဝန်ဆောင်မှုများနှင့်ကို ဆက်သွယ်ဆောင်ရွက်သလဲဆိုတာစိတ်ဝင်စားဖူးရင်၊ ဒီနည်းလမ်းက သင့်အား အထူးအစီအစဉ်တစ်ခုကိုရှာဖွေဖို့အဆင်သင့်ဖြစ်နေပြီ။

MCP ကို AI အက်ပလီကေးရှင်းများအတွက် အပြည်ပြည်ဆိုင်ရာ ဘာသာပြန်သူတစ်ယောက်လို့ထင်ပါ - USB port များက ရိုးရာကိရိယာတိုင်းကို ကြိုးသံဖြင့် ကွန်ပြူတာနှင့်ချိတ်ဆက်နိုင်သလို၊ MCP က AI မော်ဒယ်များကို အကိရိယာသို့မဟုတ် ဝန်ဆောင်မှုတိုင်းနှင့် စံနမူနာတစ်ခုအတိုင်း ချိတ်ဆက်ပေးတယ်။ သင် ဦးဆုံးသော chatbot ကို တီထွင်နေဖြစ်ဖြစ်၊ ရှုပ်ထွေးသော AI workflow များကို လုပ်ဆောင်နေဖြစ်ဖြစ် MCP ကို နားလည်ခြင်းက သင့်လက်ရာ အပို စွမ်းဆောင်ရည်မြင့်ပြီး ညှိနှိုင်းနိုင်သော အက်ပလီကေးရှင်းများဖန်တီးနိုင်မယ်။

ဒီသင်ရိုးညွှန်းတမ်းကို သင့်လေ့လာမှုခရီးစဉ်အတွက် သည်းခံမှုနှင့် မေတ္တာဖြင့် ပုံဖော်ထားပါတယ်။ သင်သိပြီးသား ရိုးရှင်းသောအယူအဆများမှ စပြီး ကိုယ်တိုင် လက်တွေ့လုပ်ဆောင်ခြင်းဖြင့် သင်၏ကျွမ်းကျင်မှုများ တိုးတက်လာစေမှာပါ။ တစ်ဆင့်ခြင်း စဉ်ဆက်မပြတ်ရှင်းလင်းတင်ပြထားပြီး လက်တွေ့ ဥပမာများ၊ နှစ်သက်ဖွယ် မိတ်ဆက်ချက်များ ပါဝင်ထားသည်။

ဒီခရီးစဉ်ကို ပြီးမြောက်ချိန်၊ သင့်ကိုယ်ပိုင် MCP ဆာဗာများ ထုတ်လုပ်နိုင်စွမ်း၊ လူကြိုက်များသော AI ပလပ်ဖောင်းများနှင့် ပေါင်းစပ်နိုင်စွမ်း၊ နှင့် ဒီနည်းပညာသည် AI ဖွံ့ဖြိုးတိုးတက်မှု၏ အနာဂတ်ကို ပြောင်းလဲနေမှုကို နားလည်ဖြစ်စေပါလိမ့်မယ်။ စိတ်လှုပ်ရှားဖွယ်နေ့စဉ်ခရီးစဉ်ကို စတင်လိုက်အောင်!

### တရားဝင်စာရွက်စာတမ်းများနှင့် သတ်မှတ်ချက်များ

ဒီသင်ရိုးညွှန်းတမ်းကို **MCP Specification 2025-11-25** (နောက်ဆုံးမှန်ကန်သောထုတ်ပြန်ချက်) နှင့် ကိုက်ညီစွာ ဖန်တီးထားပြီး MCP သတ်မှတ်ချက်သည် ခရက်ရှ်ဇယား အပေါ်အခြေခံသော ဗားရှင်းနံပါတ်စနစ် (YYYY-MM-DD နမူနာ) ကို အသုံးပြုသည်။

> **ရှေ့ဆက်ကြည့်မည်:** နောက်ထပ် သတ်မှတ်ချက်ဗားရှင်း **2026-07-28** အတွက် ထုတ်ပြန်လိုသူကို 2026 ခုနှစ် ဇူလိုင်လ ၂၈ ရက်နေ့တွင် ထုတ်ပြန်ရန် စီစဉ်ထားသည်။ ဒါဟာ protocol ကို ပို့ဆောင်မှု အလွတ်အတန်းအဖြစ် ပြုလုပ်ပေးပြီး Extensions framework (MCP Apps, Tasks) ကို တရားဝင် ပြုလုပ်၊ အာဏာပိုင်ကာကွယ်မှုများကို တင်းကျပ်စေပြီး Roots, Sampling နှင့် Logging များကို ရုံးဝင်ခွင့်ပေးခြင်းအား ထုတ်ပယ်သည်။ မပြောင်းလဲမီ အသေးစိတ်အချက်အလက်များအတွက် [What's Changing in MCP: The 2026-07-28 Release Candidate](./01-CoreConcepts/mcp-2026-07-28-release-candidate.md) ကို ကြည့်ပါ။ 

ဒီအရင်းအမြစ်များသည် သင်၏ နားလည်မှုတိုးလာလာသည့်အခါ တန်ဖိုးရှိလာမည်၊ သို့သော် အားလုံးကို ချက်ချင်းဖတ်ရန် စိတ်ပင်ပန်းမနေပါနဲ့။ သင်စိတ်ဝင်စားသော အပိုင်းများမှ စတင်ဖတ်ရွေးလေ့လာပါ။
- 📘 [MCP Documentation](https://modelcontextprotocol.io/) – ဒီမှာ သင့်အတွက် လမ်းညွှန်ကူညီမှုများနှင့် အသုံးပြုပုံသဘောနည်းများ ရှိပါသည်။ စတင်လေ့လာသူများအတွက် ရေးသားထားပြီး နားလည်ရလွယ်ကူသည့် ဥပမာများပါဝင်သည်။
- 📜 [MCP Specification](https://modelcontextprotocol.io/specification/2025-11-25) – ဒါဟာ သင်အတွက် လက်တွေ့ ထောက်ပြချက်အဖြစ် အသုံးပြုမည့် လက်စွဲစာအုပ်တစ်အုပ်ဖြစ်သည်။ သင်တန်းဖြတ်သွားသောအခါ အထူးအသေးစိတ်နှင့် အဆင့်မြင့်အင်္ဂါရပ်များကို ပြန်လည်ကြည့်ရှုနိုင်ရန်။
- 📜 [MCP Specification Versioning](https://modelcontextprotocol.io/specification/versioning) – protocol ဗားရှင်းမှတ်တမ်းနှင့် MCP သည် နမူနာအရ ကဲနှင်းသော ခရက်ရှ်ဇယားဗားရှင်းစနစ် (YYYY-MM-DD နမူနာ) ကို အသုံးပြုသည်။
- 🧑‍💻 [MCP GitHub Repository](https://github.com/modelcontextprotocol) – SDK များ၊ ကိရိယာများနှင့် အစီအမံမာမြောက် စနစ်မျိုးစုံရှိပြီး ဤနေရာတွင် လက်တွေ့ ဥပမာနှင့် အသုံးပြုနိုင်သော ကုဒ်တွေများစွာ ရှိသည်။
- 🌐 [MCP Community](https://github.com/orgs/modelcontextprotocol/discussions) – MCP အကြောင်း ရင်းနှီးသူပြည်သူများနှင့် အတွေ့အကြုံရှိ ပရော်ဖက်ရှင်နယ်များ ပါဝင်ဆွေးနွေးရန်။
  
## သင်ယူရမည့် ရည်မှန်းချက်များ

ဒီသင်ရိုးညွှန်းတမ်း အဆုံးသတ်သည်အထိ သင်သည် အသစ်ရရှိသော ကျွမ်းကျင်မှုများအပေါ် ယုံကြည်မှုနှင့် စိတ်အားထက်သန်မှုရှိမည်။ ဒီလို ရလဒ်တစ်ချို့ ရရှိမှာဖြစ်သည်။

• **MCP မူလအခြေခံများနားလည်ခြင်း**: Model Context Protocol ဆိုတာဘာလဲ၊ AI အက်ပလီကေးရှင်းများ ဘယ်လိုသည့်နည်းဖြင့် ပူးပေါင်းဆောင်ရွက်သလဲကို သက်သေများနှင့် ဥပမာဖြင့် နားလည်မည်။

• **သင်၏ ပထမဆုံး MCP ဆာဗာကို တည်ဆောက်ခြင်း**: သင်နှစ်သက်သော programming language မှာ လက်တွေ့ဥပမာများနှင့် စ၍ MCP ဆာဗာတစ်ခုကို တည်ဆောက်တတ်မည်။

• **AI မော်ဒယ်များကို အမှန်တကယ် ကိရိယာများနှင့်ချိတ်ဆက်ခြင်း**: AI မော်ဒယ်များနှင့် တကယ့်ဝန်ဆောင်မှုများအကြား ချိတ်ဆက်တတ်ခြင်းဖြင့် အက်ပလီကေးရှင်းများကို စွမ်းအားကြီးစေမည်။

• **လုံခြုံရေး အကောင်းဆုံး ကိုင်တွယ်နည်းများ အကောင်အထည်ဖော်ခြင်း**: သင်၏ MCP ဆောင်ရွက်ချက်များကို လုံခြုံစိတ်ချလုံခြုံစေမှုဆိုင်ရာ နည်းလမ်းများ နားလည်မည်။

• **ယုံကြည်စိတ်ချစွာ ဖြန့်ချိခြင်း**: သင်၏ MCP စီမံကိန်းများကို ဖွံ့ဖြိုးမှ ထုတ်လုပ်မှုအဆင့်သို့ ပုံမှန်ယုံကြည်စိတ်ချစွာ ရောက်ရှိစေရန် နည်းပြပေးမည်။

• **MCP အသိုင်းအဝိုင်းတွင် ပါဝင်ရန်**: AI အက်ပလီကေးရှင်း ဖွံ့ဖြိုးတိုးတက်မှု၏ အနာဂတ်ကို ပုံသဏ္ဍာန်ပေးနေသည့် developer များစုစည်းသော အသိုင်းအဝိုင်းတွင် ပါဝင်မည်။

## မရှိမဖြစ်လိုအပ်သည့် နောက်ခံသိစေချက်များ

MCP ၏ အကြောင်းအပြည့်အစုံသို့ ဝင်ရောက်မတတ်မီ ရှာဖွေရေးအခြေခံ အယူအဆများနားလည်မှုရှိစေရန် ကြိုးပမ်းလိုက်ပါ။ ကျွမ်းကျင်သူ မဟုတ်သော်လည်း စိတ်ပူရန်မလိုပါ၊ သင့်လိုအပ်ချက်များကို တဆင့်ချင်းရှင်းပြသွားပါမည်။

### Protocol များနားလည်မှု (အခြေခံအဆောက်အအုံ)

Protocol ကို စကားပြောဆိုခွင့် စည်းမျဉ်းများအဖြစ် ထင်ပါ။ မိတ်ဆွေတစ်ဦးကို ဖုန်းခေါ်တဲ့အခါ "ဟယ်လို" လို့ပြောတယ်၊ လေးနက်စွာ စကားပြောဖို့ အခွင့်အရေး ရှိတယ်၊ "နေကောင်းပါစေ" လို့ပြောပြီး ဖွင့်ပိတ်တယ်ဆိုတာလို၊ ကွန်ပြူတာပရိုဂရမ်တွေမှာလည်း အဲ့လို စည်းမျဉ်းတွေ လိုအပ်တယ်။

MCP က protocol တစ်ခုဖြစ်ပါတယ် - AI မော်ဒယ်တွေ၊ အက်ပလီကေးရှင်းတွေက ကိရိယာတွေနဲ့ ဝန်ဆောင်မှုတွေနဲ့ အကျိုးရှိစွာ မေးမြန်းပြောဆိုနိုင်ဖို့ သဘောတူညီထားတဲ့ စည်းမျဉ်းစနစ်တစ်ခုပါ။ လူတွေ အပြန်အလှန် စကားပြောဆိုရာမှာ စည်းမျဉ်းရှိခြင်း ကြောင့် ပိုမိုချောမွတ်တယ်ဆိုသလို AI အက်ပလီကေးရှင်းတွေကြား ဆက်သွယ်မှုလည်း MCP ကြောင့် ယုံကြည်စိတ်ချစေမှုရှိလာသည်။

### Client-Server ဆက်ဆံရေးများ (ပရိုဂရမ်တွေ ဘယ်လိုပူးပေါင်းတက်ကြ)

သင်နေ့စဥ် client-server ဆက်ဆံရေးကို အသုံးပြုနေတယ်! ဝက်ဘ်ဘရောက်ဇာ (client) ဖြင့် ဝက်ဘ်ဆိုဒ်တစ်ခုသို့ ဝင်ရောက်ကြည့်ရှုသောအခါ ဝက်ဘ်ဆာဗာမှ စာမျက်နှာအကြောင်းအရာကို ပေးပို့ပေးတယ်။ browser သည် အချက်အလက် မေးမြန်းနည်းကို သိပြီး server သည် တုံ့ပြန်နည်းကို သိတယ်။

MCP တွင်လည်း အဲ့လို client-server ဆက်ဆံရေး ရှိသည်။ AI မော်ဒယ်များသည် အချက်အလက် သို့မဟုတ် လုပ်ဆောင်ချက် မေးမြန်းသူ client ဖြစ်ပြီး MCP ဆာဗာများသည် ၎င်းစွမ်းဆောင်ရည်များကို ပေးပို့သူဖြစ်သည်။ ၎င်းသည် အကူအညီပေးသူတစ်ဦး (server) အဖြစ် AI ကို လိုအပ်သော အလုပ်များ ပြုလုပ်ပေးနိုင်သည်။

### စံပြုခြင်း အရေးကြီးပုံ (အရာအားလုံးကို ပေါင်းသင်းဆင်ခြုံစေခြင်း)

ယူဆကြည့်ပါမယ် ကားထုတ်လုပ်သူ တစ်ခုချင်းစီက မတူညီတဲ့ အမျိုးအစား ဓာတ်သတ္တုဆီကျင်းများ အသုံးပြုတယ်ဆိုရင် ကားတိုင်းအတွက် ကြိုးတပ်ကိရိယာအမျိုးအစား ကွဲပြားမှာပါ! စံပြုခြင်းဆိုတာ အားလုံး လိုက်လျောညီထွေတဲ့ နည်းလမ်းများ သဘောတူညီထားခြင်းဖြစ်ပါတယ်။

MCP က AI အက်ပလီကေးရှင်းများကို အဲ့ဒီစံနမူနာကို ပံ့ပိုးပေးသည်။ AI မော်ဒယ်တိုင်းမှာ ကိရိယာတိုင်းနှင့် အလုပ်လုပ်ဖို့ ကုဒ်ထည့်ရေးစရာမလိုပဲ MCP က သူတို့ဆက်သွယ်နိုင်တဲ့ အပြင် အများကြီးသော AI စနစ်များနှင့် အပေါင်းသင်း လို့ရတဲ့ ကိရိယာတစ်ခု တည်ဆောက်ပေးသည်။

## 🧭 သင်ယူမှုလမ်းကြောင်း အကျဉ်းချုပ်

သင့် MCP ခရီးစဉ်ကို ယုံကြည်မှုနှင့် ကျွမ်းကျင်မှု တိုးတက်လာအောင် နည်းစနစ်တကျ ဖွဲ့စည်းပေးထားသည်။ တစ်ဆင့်ခြင်း အပိုင်းအသစ်များ အသစ်တိုးမြှင့် ပေးရန် တစ်ခါတစ်ရံ သင်သိပြီးသား အပိုင်းများအား ထပ်မံသုံးသပ် ပြောင်းလဲပေးသည်။

### 🌱 အခြေခံအဆင့်: အခြေခံအထောက်အထားနားလည်ခြင်း (Module 0-2)

ဒီနေရာက သင့်ခရီးစဥ်တစ်ခု စတင်ရာနေရာ ဖြစ်သည်! MCP အတွင်း အကြောင်းအရာများကို ရိုးရိုးရှင်းရှင်း analogies နှင့် လက်တွေ့ ဥပမာများဖြင့် မိတ်ဆက်ပေးမည်။ MCP သည် ဘာလဲ၊ ဘာကြောင့်လိုအပ်ကြသည်၊ AI ဖွံ့ဖြိုးတိုးတက်မှုတွင် ဘယ်လို ပါဝင်နေသလဲဆိုတာ နားလည်သွားမည်။

• **Module 0 - MCP အကြောင်းမိတ်ဆက်**: MCP သည်ဘာလဲ၊ ကမ္ဘာကြီးတွင် AI အက်ပလီကေးရှင်း အသုံးပြုမှုများအတွက် အရေးကြီးမှုကို ကြည့်မည်။ MCP ကို အသုံးပြု၍ ဆော့ဖ်ဝဲဖန်တီးသူများရှေ့ဆက်ရာတွင် တွေ့ကြုံရသော ပြဿနာများ ရှင်းလင်းအောင် ကြိုးစားခြင်းသဘောအရ ရုပ်ရှင်တစ်ခုသလို ကြည့်ရှုမည်။


• **မော်ဂျူး ၁ - အခြေခံအယူအဆများ ရှင်းလင်းတင်ပြခြင်း**: ဒီမှာတော့ MCP ရဲ့ အရေးပါတဲ့ အခြေခံတည်ဆောက်ပစ္စည်းတွေကို သင်ယူမှာ ဖြစ်ပါတယ်။ ဒီအယူအဆတွေကို သဘာဝကျပြီး နားလည်ကောင်းမှတ်ယူနိုင်စေရန် အများကြီး ဆင်တူညီမျှ စကားလုံးများနှင့် ရုပ်သရုပ်ပုံများကို အသုံးပြုမယ်။

• **မော်ဂျူး ၂ - MCP တို့ထဲရှိ လုံခြုံရေး**: လုံခြုံရေးအကြောင်း ကြောက်စရာမို့သော် MCP မှာ အိုင်တီနည်းပညာအတွင်း လုံခြုံရေးအင်္ဂါရပ်များ ပါဝင်ပြီး သင့် အပလီကေးရှင်းများကို အစမှ ကာကွယ်ပေးဖို့ ကောင်းမွန်တဲ့ လေ့ကျင့်မှုများကို သင်ကြားပါမယ်။

### 🔨 တည်ဆောက်အဆင့်: သင့် ပထမဆုံး အကောင်အထည်ဖော်မှုများ ပြုလုပ်ခြင်း (မော်ဂျူး ၃)

အခုမှ ထူးခြားစရာ ကစားခြင်း စပြီးပြန်မယ်! သင့်ကိုယ်တိုင် MCP ဆာဗာများနှင့် ကလိုင်းများကို လက်တွေ့ တည်ဆောက်ဖန်တီးမယ်။ စိုးရိမ်စရာ မလိုပါဘူး - များသောအားဖြင့် လွယ်ကူဆုံးနဲ့ စတင်ပြီး နေရာတိုင်းမှာ လမ်းညွှန်ပါမယ်။

ဒီ မော်ဂျူးထဲမှာ သင့် ကြိုက်နှစ်သက်သော ပရိုဂရမ်မင်းဘာသာစကားဖြင့် လက်တွေ့ လေ့ကျင့်ဖို့ လမ်းညွှန်စာတမ်း များ များစွာ ပါဝင်ပါတယ်။ ပထမဆုံး ဆာဗာတစ်ခု ဖန်တီးပြီး ကလိုင်းတစ်ခုကို ချိတ်ဆက်ဖန်တီးဆိုင်း ပြုလုပ်ပါ၊ နောက်ထပ် VS Code ကဲ့သို့ လူကြိုက်များသော ဖွံ့ဖြိုးရေးကိရိယာများနှင့် ပေါင်းစည်းပါ။

လမ်းညွှန်တိုင်းတွင် တိကျသေချာသော ကုဒ်နမူနာများ၊ ပြဿနာရှာဖွေပြုပြင်သည့် အကြံပြုချက်များနှင့် ဒီဇိုင်း ရွေးချယ်မှုများ၏ အကြောင်းပြချက်များ ပါ ပါဝင်ပါတယ်။ ဒီအဆင့်ပြီးဆုံးသောအခါမှာ သင်အလျားလိုက် MCP အကောင်အထည်ဖော်မှုများကို ကိုယ်တိုင် ဂုဏ်ယူစွာ ပိုင်ဆိုင်ထားပါလိမ့်မယ်။

### 🚀 ကြီးထွားမှု အဆင့်: အဆင့်မြင့် အယူအဆများနှင့် အမှန်တကယ် အသုံးချမှု (မော်ဂျူး ၄-၅)

အခြေခံကို ကျွမ်းကျင်ရာမှာ သင် MCP ရဲ့ ပိုမိုရှုပ်ထွေးသော အင်္ဂါရပ်များကို ရှာဖွေဖို့ ပြင်ဆင်ထားပါပြီ။ ကောင်းမွန်သော အကောင်အထည်ဖော်နည်းများ၊ ပြဿနာရှာဖွေရေးနည်းလမ်းများနှင့် မျိုးစုံ AI ပေါင်းစပ်ခြင်းကဲ့သို့ အဆင့်မြင့် အကြောင်းအရာများကို ဖော်ပြပါမယ်။

ထို့အပြင် သင့် MCP အကောင်အထည်ဖော်မှုများကို ထုတ်လုပ်မှု အတွက် ပိုမိုအကျယ်ပြန့်စွာ အသုံးပြုနိုင်ရန်နှင့် Azure ကဲ့သို့ စတိုးဆိုင် မိုဃ်းတိမ် ပလက်ဖောင်းများနှင့် ပေါင်းစည်းအသုံးပြုနိုင်ရန်လည်း သင်ယူမယ်။ ဒီမော်ဂျူးတွေက သင်ကို အမှန်တကယ် လိုအပ်ချက်များကို ဖြေရှင်းနိုင်သည့် MCP ဖြေရှင်းနည်းများ တည်ဆောက်နိုင်ဖို့ ပြင်ဆင်ပေးပါမယ်။

### 🌟 ကျွမ်းကျင်မှု အဆင့်: လူမှုအသိုင်းအဝိုင်းနှင့် အထူးပြုမှု (မော်ဂျူး ၆-၁၁)

နောက်ဆုံးအဆင့်မှာ MCP လူမှုအသိုင်းအဝိုင်းနှင့် ပူးပေါင်းပြီး သင့်စိတ်ဝင်စားရာ နယ်ပယ်များတွင် အထူးပြုဖို့ အလေးအနက်ပြုမယ်။ သင်သည် မွမ်းမံထားသော MCP ပရောဂျက်များတွင် အထောက်အပံ့ ပေးနိုင်သည့် နည်းလမ်းများ၊ လုံခြုံရေးပုံစံများ၊ နှင့် အပြည့်အစုံ ဒေတာဘေ့စိမ် ပေါင်းစည်းထားသော ဖြေရှင်းနည်းများ ဖန်တီးပုံကို သင်ယူမှာ ဖြစ်ပါသည်။

မော်ဂျူး ၁၁ ကို အထူးပြောစရာထားပြီး၊ ၁၃-ခန်းခွဲ လက်တွေ့သင်ယူမှုလမ်းစဉ်တစ်ခု ဖြစ်ပြီး PostgreSQL ပေါင်းစည်းမှုနဲ့ ထုတ်လုပ်မှုအသင့် MCP ဆာဗာများ တည်ဆောက်နည်းကို သင်ကြားသွားမယ်။ သင်ခန်းစာတွေအားလုံးကို အတူတကွ ဆုပေးမယ့် အစီအစဉ်တစ်ခုလို ဖြစ်ပါတယ်!

### 📚 လုံးဝ သင်ခန်းစာအစီအစဉ် ဖွဲ့စည်းမှု

| မော်ဂျူး | ခေါင်းစဉ် | ပSVင်တမ်း | လင့်ခ် |
|--------|-------|-------------|------|
| **မော်ဂျူး ၀-၃: အခြေခံအကြောင်းအရာများ** | | | |
| ၀၀ | MCP သို့ အနိင်္ဍာရိုင်း | Model Context Protocol နှင့် အရေးပါမှု AI ပိုင်းဆိုင်ရာ လမ်းကြောင်းများ | [Read more](./00-Introduction/README.md) |
| ၀၁ | အခြေခံအယူအဆများ ရှင်းလင်းတင်ပြခြင်း | MCP အခြေခံအယူအဆများ လေ့လာခြင်း | [Read more](./01-CoreConcepts/README.md) |
| ၁.၁ | MCP တွင် ပြောင်းလဲမှုများ (2026-07-28 RC) | Stateless protocol, Extensions framework, နောက်ထပ် မူကွဲတွင် ပါမည့် လုပ်ဆောင်ချက်များ ရွေးချယ်မှုများ | [Guide](./01-CoreConcepts/mcp-2026-07-28-release-candidate.md) |
| ၀၂ | MCP ထဲရှိ လုံခြုံရေး | လုံခြုံရေး အန္တရာယ်များနှင့် ကောင်းမွန်သော လေ့ကျင့်မှုများ | [Read more](./02-Security/README.md) |
| ၀၃ | MCP ဖြင့် စတင်ခြင်း | ပတ်ဝန်းကျင် ပြင်ဆင်မှု၊ အခြေခံဆာဗာ/ကလိုင်း များ၊ ပေါင်းစပ်ခြင်း | [Read more](./03-GettingStarted/README.md) |
| **မော်ဂျူး ၃: ပထမဆုံး ဆာဗာနှင့် ကလိုင်း ဖန်တီးခြင်း** | | | |
| ၃.၁ | ပထမဆုံး ဆာဗာ | သင့် ပထမဆုံး MCP ဆာဗာ ဖန်တီးခြင်း | [Guide](./03-GettingStarted/01-first-server/README.md) |
| ၃.၂ | ပထမဆုံး ကလိုင်း | အခြေခံ MCP ကလိုင်း တည်ဆောက်ခြင်း | [Guide](./03-GettingStarted/02-client/README.md) |
| ၃.၃ | LLM ပါသည့် ကလိုင်း | စကားပြောထားစကားလုံး မော်ဒယ်များ ပေါင်းစပ်ခြင်း | [Guide](./03-GettingStarted/03-llm-client/README.md) |
| ၃.၄ | VS Code ပေါင်းစည်းခြင်း | VS Code တွင် MCP ဆာဗာများ အသုံးပြုခြင်း | [Guide](./03-GettingStarted/04-vscode/README.md) |
| ၃.၅ | stdio ဆာဗာ | stdio ကွန်ယက်ပို့ဆောင်မှု အသုံးပြု၍ ဆာဗာ ဖန်တီးခြင်း | [Guide](./03-GettingStarted/05-stdio-server/README.md) |
| ၃.၆ | HTTP စီးဆင်းမှု | MCP တွင် HTTP စီးဆင်းမှု အကောင်အထည်ဖော်ခြင်း | [Guide](./03-GettingStarted/06-http-streaming/README.md) |
| ၃.၇ | Microsoft Foundry ကိရိယာတိ | MCP နှင့် Microsoft Foundry ကိရိယာတိ အသုံးပြုခြင်း | [Guide](./03-GettingStarted/07-aitk/README.md) |
| ၃.၈ | စမ်းသပ်ခြင်း | သင့် MCP ဆာဗာ အကောင်အထည်ဖော်မှု စမ်းသပ်ခြင်း | [Guide](./03-GettingStarted/08-testing/README.md) |
| ၃.၉ | ထုတ်လုပ်ခြင်း | MCP ဆာဗာများကို ထုတ်လုပ်မှုသို့ တင်သွင်းခြင်း | [Guide](./03-GettingStarted/09-deployment/README.md) |
| ၃.၁၀ | အဆင့်မြင့် ဆာဗာ အသုံးပြုမှု | အဆင့်မြင့် အင်္ဂါရပ်အသုံးပြုမှုနှင့် တိုးတက်ကောင်းမွန်သော စက်ရုံဒီဇိုင်းဆွဲခြင်း | [Guide](./03-GettingStarted/10-advanced/README.md) |
| ၃.၁၁ | လွယ်ကူသော အတည်ပြုမှု | အတည်ပြုမှု ကို စတင်၍ RBAC နှင့် မျှဝေပေးခြင်း | [Guide](./03-GettingStarted/11-simple-auth/README.md) |
| ၃.၁၂ | MCP ဟိုစ့်များ | Claude Desktop, Cursor, Cline နှင့် အခြား MCP ဟိုစ့်များ ပုံမှန်ပြင်ဆင်ခြင်း | [Guide](./03-GettingStarted/12-mcp-hosts/README.md) |
| ၃.၁၃ | MCP စစ်ဆေးသူ | Inspector ကိရိယာဖြင့် MCP ဆာဗာများ ကို ပြုပြင်စစ်ဆေးခြင်း | [Guide](./03-GettingStarted/13-mcp-inspector/README.md) |
| ၃.၁၄ | နမူနာ ရွေးချယ်ခြင်း | ကလိုင်းနှင့် ပူးပေါင်းဆောင်ရွက်ရန် နမူနာ အသုံးပြုမှု | [Guide](./03-GettingStarted/14-sampling/README.md) |
| ၃.၁၅ | MCP အက်ပ်များ | MCP အက်ပ်များ တည်ဆောက်ခြင်း | [Guide](./03-GettingStarted/15-mcp-apps/README.md) |
| **မော်ဂျူး ၄-၅: လက်တွေ့နှင့် အဆင့်မြှင့်** | | | |
| ၀၄ | လက်တွေ့ အကောင်အထည်ဖော်ခြင်း | SDK များ၊ ပြဿနာရှာဖွေရေး၊ စမ်းသပ်ခြင်း၊ ထပ်ခါထပ်ခါအသုံးပြုနိုင်သော အစီအစဉ်ပုံစံများ | [Read more](./04-PracticalImplementation/README.md) |
| ၄.၁ | စာမျက်နှာခွဲခြင်း | ကြီးမားသော ရလဒ်များကို cursor-based pagination ဖြင့် ကိုင်တွယ်ခြင်း | [Guide](./04-PracticalImplementation/pagination/README.md) |
| ၀၅ | MCP တွင် အဆင့်မြင့် အကြောင်းအရာများ | မျိုးစုံ AI, ပမာဏမြှင့်တင်မှု, စီးပွားရေးအသုံးပြုမှု | [Read more](./05-AdvancedTopics/README.md) |
| ၅.၁ | Azure ပေါင်းစည်းမှု | MCP နှင့် Azure ပေါင်းစည်းခြင်း | [Guide](./05-AdvancedTopics/mcp-integration/README.md) |
| ၅.၂ | မျိုးစုံပုံစံများ | မျိုးစုံပုံစံများနှင့် အလုပ်လုပ်ခြင်း | [Guide](./05-AdvancedTopics/mcp-multi-modality/README.md) |
| ၅.၃ | OAuth2 ကိုယ်စားပြုမှု | OAuth2 အတည်ပြုမှု လုပ်ဆောင်ခြင်း | [Guide](./05-AdvancedTopics/mcp-oauth2-demo/README.md) |
| ၅.၄ | မူလ စာအုပ် | မူလစာအုပ် အားနားလည်ခြင်းနှင့် အကောင်အထည်ဖော်ခြင်း | [Guide](./05-AdvancedTopics/mcp-root-contexts/README.md) |
| ၅.၅ | လမ်းကြောင်းချထားခြင်း | MCP လမ်းကြောင်း များ | [Guide](./05-AdvancedTopics/mcp-routing/README.md) |
| ၅.၆ | နမူနာ ရွေးချယ်ခြင်း | MCP တွင် နမူနာ ရွေးချယ်နည်းများ | [Guide](./05-AdvancedTopics/mcp-sampling/README.md) |
| ၅.၇ | ပမာဏမြှင့်တင်ခြင်း | MCP အကောင်အထည်ဖော်မှုများကို ပမာဏမြှင့်တင်ခြင်း | [Guide](./05-AdvancedTopics/mcp-scaling/README.md) |
| ၅.၈ | လုံခြုံရေး | အဆင့်မြင့် လုံခြုံရေးစဉ်းစားချက်များ | [Guide](./05-AdvancedTopics/mcp-security/README.md) |
| ၅.၉ | ဝက်ဘ် ရှာဖွေခြင်း | ဝက်ဘ် ရှာဖွေရေး လုပ်ဆောင်ချက်များ ဖန်တီးခြင်း | [Guide](./05-AdvancedTopics/web-search-mcp/README.md) |
| ၅.၁၀ | အချိန်နှင့်တပြေးညီ စီးဆင်းမှု | အချိန်နှင့်တပြေးညီ စီးဆင်းမှု လုပ်ဆောင်ချက် ဖန်တီးခြင်း | [Guide](./05-AdvancedTopics/mcp-realtimestreaming/README.md) |
| ၅.၁၁ | အချိန်နှင့်တပြေးညီ ရှာဖွေမှု | အချိန်နှင့်တပြေးညီ ရှာဖွေမှု လုပ်ဆောင်မှု | [Guide](./05-AdvancedTopics/mcp-realtimesearch/README.md) |
| ၅.၁၂ | Entra ID အတည်ပြုမှု | Microsoft Entra ID ဖြင့် အတည်ပြုမှု | [Guide](./05-AdvancedTopics/mcp-security-entra/README.md) |
| ၅.၁၃ | Foundry ပေါင်းစည်းမှု | Microsoft Foundry နှင့် ပေါင်းစည်းခြင်း | [Guide](./05-AdvancedTopics/mcp-foundry-agent-integration/README.md) |
| ၅.၁၄ | ကွန်တက် နည်းပညာ | ထိရောက်သော ကွန်တက် အင်ဂျင်နီယာနည်းလမ်းများ | [Guide](./05-AdvancedTopics/mcp-contextengineering/README.md) |
| ၅.၁၅ | MCP စိတ်ကြိုက် ပို့ဆောင်မှု | စိတ်ကြိုက် ပို့ဆောင်မှု အကောင်အထည်ဖော်မှုများ | [Guide](./05-AdvancedTopics/mcp-transport/README.md) |
| ၅.၁၆ | ပရိုတိုကော လုပ်ဆောင်ချက်များ | အဆင့်မီ အသိပေးချက်များ၊ ပယ်ဖျက်မှု၊ အရင်းအမြစ် ပုံစံများ | [Guide](./05-AdvancedTopics/mcp-protocol-features/README.md) |
| ၅.၁၇ | ယှဉ်ပြိုင်သော Agent နှစ်ဦး၏ အဓိက အကြံဥာဏ် | Agent နှစ်ဦး သည် MCP ကိရိယာများကို ဖြင့် လက်တွဲ ဆွေးနွေးခြင်း၊ ဉပမာဖြင့် သုံးသပ်ခြင်း | [Guide](./05-AdvancedTopics/mcp-adversarial-agents/README.md) |
| **မော်ဂျူး ၆-၁၀: လူမှုအသိုင်းအဝိုင်းနှင့် ကောင်းမွန်သော လေ့ကျင့်မှုများ** | | | |
| ၀၆ | လူမှုအသိုင်းအဝိုင်း အထောက်အပံ့များ | MCP ecosystem ထဲတွင် ကူညီပံ့ပိုးခြင်း နည်းလမ်းများ | [Guide](./06-CommunityContributions/README.md) |
| ၀၇ | ပထမဆုံး အသုံးချသူများ၏ အတွေ့အကြုံများ | အမှန်တကယ် အသုံးချမှု ဇာတ်လမ်းများ | [Guide](./07-LessonsfromEarlyAdoption/README.md) |
| ၀၈ | MCP အတွက် ကောင်းမွန်သော လေ့ကျင့်မှုများ | စွမ်းဆောင်ရည်၊ ချို့ယွင်းချက်ခံနိုင်ရည်၊ တည်ငြိမ်မှု | [Guide](./08-BestPractices/README.md) |
| ၀၉ | MCP မူလနမူနာများ | လက်တွေ့ အကောင်အထည်ဖော်မှု ဥပမာများ | [Guide](./09-CaseStudy/README.md) |
| ၁၀ | လက်တွေ့ အလုပ်ရုံဆွေးနွေးပွဲ | Microsoft Foundry Toolkit ဖြင့် MCP ဆာဗာတည်ဆောက်ခြင်း | [Lab](./10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md) |
| **မော်ဂျူး ၁၁: MCP ဆာဗာ လက်တွေ့သင်ကြားမှု** | | | |
| ၁၁ | MCP ဆာဗာ ဒေတာဘေ့စိမ် ပေါင်းစည်းမှု | PostgreSQL ပေါင်းစည်းမှု အတွက် ၁၃-ခန်းခွဲ လက်တွေ့သင်ယူမှု လမ်းစဉ် | [Labs](./11-MCPServerHandsOnLabs/README.md) |
| ၁၁.၁ | နိဒါန်း | ဒေတာဘေ့စိမ် ပေါင်းစည်းမှုနှင့် လက်လီ စျေးကွက် သုံးသပ်မှုအသုံးပြုမှုဖြင့် MCP ဗဟုသုတ | [Lab 00](./11-MCPServerHandsOnLabs/00-Introduction/README.md) |
| ၁၁.၂ | အခြေခံ ဖွဲ့စည်းပုံ | MCP ဆာဗာ ဖွဲ့စည်းပုံ၊ ဒေတာဘေ့စိမ်အလွှာများနှင့် လုံခြုံရေးပုံစံများ နားလည်ခြင်း | [Lab 01](./11-MCPServerHandsOnLabs/01-Architecture/README.md) |
| ၁၁.၃ | လုံခြုံရေးနှင့် မတူကွဲပြားသော အက်ဆိင့်များ | စာကြည့်တိုက်အဆင့် လုံခြုံရေး၊ အတည်ပြုမှု၊ မတူကွဲပြားသော အချက်အလက် ဝင်ရောက်ခွင့်များ | [Lab 02](./11-MCPServerHandsOnLabs/02-Security/README.md) |
| ၁၁.၄ | ပတ်ဝန်းကျင် ပြင်ဆင်မှု | ဖွံ့ဖြိုးရေးပတ်ဝန်းကျင်၊ Docker, Azure အရင်းအမြစ်များ ပြင်ဆင်ခြင်း | [Lab 03](./11-MCPServerHandsOnLabs/03-Setup/README.md) |
| ၁၁.၅ | ဒေတာဘေ့စ် ဒီဇိုင်း | PostgreSQL ပြင်ဆင်ခြင်း၊ လက်လီ စည်းမျဉ်း ဖန်တီးခြင်း၊ နမူနာ ဒေတာ | [Lab 04](./11-MCPServerHandsOnLabs/04-Database/README.md) |
| ၁၁.၆ | MCP ဆာဗာ အကောင်အထည်ဖော်ခြင်း | ဒေတာဘေ့့စိမ် ပေါင်းစည်းမှုနှင့် FastMCP ဆာဗာ တည်ဆောက်ခြင်း | [Lab 05](./11-MCPServerHandsOnLabs/05-MCP-Server/README.md) |
| ၁၁.၇ | ကိရိယာ ဖန်တီးခြင်း | ဒေတာဘေ့စိမ် စစ်ဆေးမှု ကိရိယာများနှင့် စနစ်ဖြတ်သန်းခြင်း ပြုလုပ်ခြင်း | [Lab 06](./11-MCPServerHandsOnLabs/06-Tools/README.md) |
| ၁၁.၈ | သင်္ကေတ ရှာဖွေခြင်း | Azure OpenAI နှင့် pgvector ဖြင့် vector embedding များ စတင်အသုံးပြုခြင်း | [Lab 07](./11-MCPServerHandsOnLabs/07-Semantic-Search/README.md) |
| ၁၁.၉ | စမ်းသပ်မှုနှင့် ပြုပြင်ခြင်း | စမ်းသပ်နည်းများ၊ ပြုပြင်ကိရိယာများနှင့် အတည်ပြုပုံများ | [Lab 08](./11-MCPServerHandsOnLabs/08-Testing/README.md) |
| ၁၁.၁၀ | VS Code ပေါင်းစည်းခြင်း | VS Code MCP ပေါင်းစည်းမှုနှင့် AI စကားဝိုင်း အသုံးပြုမှု ရှင်းလင်းချက် | [Lab 09](./11-MCPServerHandsOnLabs/09-VS-Code/README.md) |
| ၁၁.၁၁ | ထုတ်လုပ်မှု နည်းလမ်းများ | Docker ထုတ်လုပ်မှု၊ Azure Container Apps နှင့် ပမာဏမြှင့်တင်ခြင်း ဆွေးနွေးချက်များ | [Lab 10](./11-MCPServerHandsOnLabs/10-Deployment/README.md) |
| ၁၁.၁၂ | စောင့်ကြည့်မှု | Application Insights, မှတ်တမ်းတင်ခြင်းနှင့် စွမ်းဆောင်ရည် စောင့်ကြည့်ခြင်း | [Lab 11](./11-MCPServerHandsOnLabs/11-Monitoring/README.md) |
| ၁၁.၁၃ | ကောင်းမွန်သော လေ့ကျင့်မှုများ | စွမ်းဆောင်ရည် မြှင့်တင်ခြင်း၊ လုံခြုံရေး တင်းကြပ်ခြင်း နှင့် ထုတ်လုပ်မှု အတွက်အကြံဥာဏ်များ | [Lab 12](./11-MCPServerHandsOnLabs/12-Best-Practices/README.md) |
| **မော်ဂျူး ၁၂: MCP ကိရိယာများ** | | | |
| ၁၂.၁ | ကိရိယာများ | Copilot App ထဲ MCP အသုံးပြုမှု | [ Guide ](./12-tooling/README.md) |

### 💻 နမူနာ ကုဒ် ပရောဂျက်များ

MCP သင်ယူရာတွင် အတွေ့အကြုံ တိုးတက်တိုးမြှင့် သွားတာက အရမ်းကို စိတ်ကြိုက်ဖို့ ရှိပါတယ်။ ကျွန်ုပ်တို့၏ ကုဒ်နမူနာများသည် ရိုးရိုးလေး စတင်ပြီး နားလည်မှု တိုးလာတာနဲ့အမျှ နောက်ထပ် အဆင့်မြင့် နဲ့ စိစစ်သုံးသပ် သဘာဝကျသော MCP သဘောတရားများကို ဖော်ပြမယ်။ ဒီဘယ်လို သဘောတရားများရှိလဲဆိုတာ သိဖို့အတွက် ကုဒ်နမူနာများကို သပ်ရပ်လွယ်ကူစွာ နားလည်နိုင်ပြီး ဘာကြောင့် ဒီအတိုင်း ဖန်တီးထားတာလဲ၊ MCP ထိန်းချုပ်မှုတွေ အတွင်းမှာ ဘယ်လို ပါလာလဲ ဆိုတာကိုလည်း နားလည်နိုင်မှာ ဖြစ်ပါတယ်။

#### အခြေခံ MCP ကိန်းဂဏန်းတွက်စက် နမူနာများ

| ဘာသာစကား | ဖော်ပြချက် | လင့်ခ် |
|----------|-------------|------|
| C# | MCP ဆာဗာ နမူနာ | [View Code](./03-GettingStarted/samples/csharp/README.md) |
| Java | MCP ကိန်းဂဏန်းတွက်စက် | [View Code](./03-GettingStarted/samples/java/calculator/README.md) |

| JavaScript | MCP မိတ်ဆက် | [View Code](./03-GettingStarted/samples/javascript/README.md) |
| Python | MCP ဆာဗာ | [View Code](../../03-GettingStarted/samples/python/mcp_calculator_server.py) |
| TypeScript | MCP နမူနာ | [View Code](./03-GettingStarted/samples/typescript/README.md) |
| Rust | MCP နမူနာ | [View Code](./03-GettingStarted/samples/rust/README.md) |

#### အဆင့်မြင့် MCP အကောင်အထည်ဖော်မှုများ

| မျိုးဘာသာ | ဖော်ပြချက် | Link |
|----------|-------------|------|
| C# | အဆင့်မြင့် နမူနာ | [View Code](./04-PracticalImplementation/samples/csharp/README.md) |
| Java with Spring | အထုပ်ဆိုင်ရာ အက်ပ်နမူနာ | [View Code](./04-PracticalImplementation/samples/java/containerapp/README.md) |
| JavaScript | အဆင့်မြင့် နမူနာ | [View Code](./04-PracticalImplementation/samples/javascript/README.md) |
| Python | စီမံခန့်ခွဲမှု မျှဝေပုံ | [View Code](./04-PracticalImplementation/samples/python/README.md) |
| TypeScript | အထုပ် နမူနာ | [View Code](./04-PracticalImplementation/samples/typescript/README.md) |


## 🎯 MCP လေ့လာရန်လိုအပ်ချက်များ

ဒီ သင်ကြားမှုအစီအစဉ်မှ အကောင်းဆုံးရယူနိုင်ဖို့၊ သင်တွင် ရှိသင့်တယ် -

- C#, Java, JavaScript, Python သို့မဟုတ် TypeScript ထဲမှ အနည်းဆုံး တစ်ခုခုတွင် အခြေခံ ပogramming အသိပညာ
- client-server ပုံစံနှင့် APIs ကို နားလည်မှု
- REST နှင့် HTTP သဘောတရားများအား သိရှိမှု
- (Optional) AI/ML သဘောတရားများတွင် နောက်ခံပညာ

- ကျွန်ုပ်တို့ရဲ့ သင်ယူသူများ၏ ဆွေးနွေးပွဲများတွင် ပါဝင်ရန်

## 📚 သင်ကြားမှုလမ်းညွှန်နှင့် အရင်းအမြစ်များ

ဒီ ရေပန်းစားမှု မှာ သင်ကြားမှုကို ထိရောက်စွာ လမ်းညွှန်ပေးရန် အရင်းအမြစ်များအများအပြားပါဝင်သည်။

### သင်ကြားမှုလမ်းညွှန်

စုံလင်သော [သင်ကြားမှုလမ်းညွှန်](./study_guide.md) တစ်ခုရှိပြီး ဒီ ရေပန်းစားမှုကို ထိရောက်စွာ လမ်းညွှန်ပေးသည်။ ဤပုံရိပ် သင်ရိုးမှ ပြသထားသူများအတွက် နေရာအားလုံးဆက်သွယ်ပုံကို မြင်သာစေပြီး နမူနာပရောဂျက်များကို ဘယ်လို အသုံးပြုရမည်ကိုလည်း လမ်းညွှန်ပေးသည်။ ကြီးမားသောဇယားကို ကြည့်ရှု့ရတဲ့ ဗိသုကာမှူးသင်ယူသူများအတွက် အထူးထောက်ပံ့မှုကောင်းတစ်ခုဖြစ်သည်။

လမ်းညွှန်တွင် ပါဝင်သည် -
- ကွက်တိကျသော သင်ရိုးအစီအစဉ်တွင် ပါဝင်သော ခေါင်းစဉ်အားလုံးကို မြင်နိုင်သော ဗိသုကာမြေပုံ
- repository ၏ ဌာနအစိတ်အပိုင်းများကို အသေးစိတ်ဖွဲ့စည်းတင်ပြမှု
- နမူနာပရောဂျက်များကို ဘယ်လိုအသုံးပြုရမည်ကို လမ်းညွှန်မှု
- စွမ်းရည်အဆင့်အမျိုးမျိုးအတွက် အကြံပြုသင်ယူမှု လမ်းကြောင်းများ
- သင်ယူမှုခရီးစဉ် complément လုပ်ရန် ထပ်ဆောင်းအရင်းအမြစ်များ

### ပြုပြင်မွမ်းမံမှုမှတ်တမ်း

ကျွန်ုပ်တို့သည် အဓိက curriculum ပစ္စည်းများကို နောက်ဆုံးတိုးတက်ပြောင်းလဲမှုများနှင့် အဆင့်မြှင့်တင်မှုများကို မှတ်တမ်းတင်ထားသော [ပြုပြင်မွမ်းမံမှုမှတ်တမ်း](./changelog.md) ကိုထိန်းသိမ်းထားသည်။
- မူရင်းအကြောင်းအရာ အသစ်များ ထည့်သွင်းခြင်း
- ဆောက်လုပ်မှု ပြောင်းလဲမှုများ
- အင်္ဂါရပ် တိုးတက်မှုများ
- စာရွက်စာတမ်း ပြင်ဆင်မှုများ

## 🛠️ ဒီ သင်ကြားမှုကို ထိရောက်စွာ အသုံးပြုနည်း

သင်ခန်းစာတိုင်းတွင် ပါဝင်သည် -

1. MCP မှတ်ချက်များကို ပေါ်လွင်ရှင်းလင်းသော ရှင်းပြချက်များ  
2. ဘာသာစကားဧရိယာ အမျိုးမျိုးတွင် Live ကုဒ် နမူနာများ  
3. လက်တွေ့ MCP အက်ပလီကေးရှင်းဖန်တီးခြင်း အလုပ်လက်တွေ့လေ့ကျင့်ခန်းများ  
4. အဆင့်မြင့် သင်ယူသူများအတွက် ထပ်ဆောင်းအရင်းအမြစ်များ

### C# နဲ့ MCP သင်ခန်းစာလမ်းစဉ်
Model Context Protocol (MCP) ကို လေ့လာကြရအောင်၊  သည်တီထွင်ဆန်းသစ်ရေးစနစ်သည် AI မော်ဒယ်များနှင့် client applications များအကြား ဆက်သွယ်မှုများကို စံပြ စနစ်ကြမ်းပြင်ဖြစ်အောင် ဖန်တီးထားသည်။ စတင်လေ့လာသူများအတွက် ဒီ အစည်းအဝေးက MCP ကိုမိတ်ဆက်ပေးပြီး လက်တွင် ပထမဆုံး MCP ဆာဗာကို ဖန်တီးခြင်းကို လမ်းညွှန်ပေးပါမည်။
#### C#: [https://aka.ms/letslearnmcp-csharp](https://aka.ms/letslearnmcp-csharp)
#### Java: [https://aka.ms/letslearnmcp-java](https://aka.ms/letslearnmcp-java)
#### JavaScript: [https://aka.ms/letslearnmcp-javascript](https://aka.ms/letslearnmcp-javascript)
#### Python: [https://aka.ms/letslearnmcp-python](https://aka.ms/letslearnmcp-python)

## 🎓 သင့်ရဲ့ MCP ခရီးစဉ် စတင်သည်

ဂုဏ်ယူပါတယ်! သင်သည် သင်၏ programming စွမ်းရည်များကို တိုးတက်စေပြီး AI ဖွံ့ဖြိုးတိုးတက်မှုတွင် နောက်ဆုံးပေါ်နည်းပညာများနှင့် ချိတ်ဆက်ပေးမယ့် စိတ်လှုပ်ရှားဖွယ် ခရီးစဉ်တစ်ခုအတွက် ပထမဆုံးခြေလှမ်းကို ရယူလိုက်ပြီဖြစ်သည်။

### သင့်ရဲ့ မပြီးစီးသေးတဲ့ အလုပ်များ

မိတ်ဆက်ဘာသာစကားကို ဖတ်ပြီးပြီးနောက် သင်သည် MCP အသိပညာအခြေခံ အားတည်ဆောက်မှုကို စတင်လိုက်ပြီ ဖြစ်သည်။ MCP မှာ ဘာတွေလဲ၊ ဘာကြောင့် အရေးကြီးတာလဲ၊ ဒီ သင်ကြားမှုအစီအစဉ်က သင့်လေ့လာမှု ခရီးစဉ်ကို ဘယ်လို ထောက်ပံ့ပေးမလဲ ကို နားလည်သွားပြီ ဖြစ်ပါတယ်။ ဒါက အရေးပါတဲ့ နည်းပညာတစ်ခုကို ကျွမ်းကျင်သူဖြစ်လာဖို့ အစဖြစ်ပါတယ်။

### ရှေ့ဆက်မယ့် စွန့်စားခန်း

မော်ဂျူးများကို တိုးတက်မြှင့်တင်သွားသဘောထားထားတော့ မည်သည့် ကျွမ်းကျင်သူတစ်ဦးကမဆို အစမှာ စတင်သူတစ်ယောက်သာဖြစ်ခဲ့သည်ကို သတိရပါ။ ယခု အခါ စိုးရိမ်မိသော သဘောတရားများသည် လေ့ကျင့်ပြီး အကောင်အထည်ဖော်လိုက်လျှင် ဒုတိယဘာသာဖြစ်လာပါလိမ့်မယ်။ ခြေလှမ်းတိုင်းသည် သင့် ဖွံ့ဖြိုးတိုးတက်ရေး အလုပ်အကိုင်မှာ ပြင်းထန်သော စွမ်းရည်များဖွံ့ဖြိုးရေးသို့ ဦးတည်ပါသည်။

### သင့်ပံ့ပိုးကူညီသူ စနစ်

သင်သည် MCP နှင့် စိတ်အားထက်သန်ပြီး အခြားများအောင်မြင်ရန် အတူကူရန် တုံ့ပြန်နေကြသော သင်ယူနွေးထွေးသော လူ့အဖွဲ့အစည်းတစ်ခုကို ဝင်ရောက်ပါသည်။ သင် ကုဒ်ပြဿနာတစ်ခုတွင် ထူသွားသည်မှလည်းကောင်း၊ အောင်မြင်မှုတစ်ခုကို မျှဝေရန် စိတ်လှုပ်ရှားမှုရှိချိန်မှလည်းကောင်း၊ လူမှုအသိုင်းအဝိုင်းသည် သင့်ခရီးစဉ်ကို ထောက်ပံ့ပေးရန်ရှိပါသည်။

သင် ဘယ်လို AI အက်ပလီကေးရှင်းများ ဖန်တီးရမလဲဆိုတာအပေါ် မေးခွန်းရှိနေပါကလည်း MCP နှင့် ပတ်သက်သော ဆွေးနွေးပွဲများတွင် တက်ရောက်ပါ။ ဒီမှာ မေးခွန်းတင်နိုင်ပြီး အသိပညာများကို လွတ်လပ်စွာ မျှဝေရန် ကူညီပေးနေသော ပေါင်းသင်းမှုကောင်းသော အသိုင်းအဝိုင်းဖြစ်သည်။

[![Microsoft Foundry Discord](https://dcbadge.limes.pink/api/server/nTYy5BXMWG)](https://discord.gg/nTYy5BXMWG)

ထုတ်ကုန်အကြံပြုချက် သို့မဟုတ် အမှားများ ရှိပါက သွားရောက်ပါ -

[![Microsoft Foundry Developer Forum](https://img.shields.io/badge/GitHub-Microsoft_Foundry_Developer_Forum-blue?style=for-the-badge&logo=github&color=000000&logoColor=fff)](https://aka.ms/foundry/forum)

### စတင်ရန် ပြင်ဆင်ပြီးပြီလား?

သင့် MCP စွန့်စားခန်း ယခုစတင်ပါပြီ! Module 0 ဖြင့်စတင်၍ ပထမဆုံး MCP လက်တွေ့အတွေ့အကြုံများ သို့မဟုတ် နမူနာပရောဂျက်များကို စတင်ကြည့်ပါ။ မမေ့ပါနှင့် - ကျွမ်းကျင်သူတိုင်းသည် သင်နေနေရာမှာ စတင်ခဲ့ပြီး သည်းခံမှုနှင့် လေ့ကျင့်မှုဖြင့် ထူးခြားသွားကြသည်။

Model Context Protocol ဖန်တီးမှုကမ္ဘာအား ကြိုဆိုပါသည်။ အတူတကွ အံ့သြဖွယ် ကောင်းမွန်သောအရာတစ်ခု ဖန်တီးကြစို့!

## 🤝 သင်ယူသူ အသိုင်းအဝိုင်း ဆောင်ရွက်မှုများတွင် ပါဝင်ခြင်း

ဒီ သင်ကြားမူသည် သင့်ကဲ့သို့သော သင်ယူသူများ၏ ပါဝင်မှုဖြင့် ပိုမိုကောင်းမွန်ဖြစ်နေပါသည်။ ရေးမှုဖြစ်ဖြစ်၊ ပိုမိုရှင်းလင်းသော ရှင်းပြချက် တင်သွင်းမှုဖြစ်ဖြစ်၊ နမူနာအသစ်ထည့်သွင်းမှုဖြစ်ဖြစ် သင့် ပံ့ပိုးမှုများသည် အခြား စတင်လေ့လာသူများ အောင်မြင်ရန် အထောက်အကူဖြစ်ပါသည်။

Microsoft အထူးတန်ဖိုးထားသူ [Shivam Goyal](https://www.linkedin.com/in/shivam2003/) ကို ကုဒ်နမူနာများ ပံ့ပိုးပေးမှုအတွက် ကျေးဇူးတင်ရှိပါသည်။

ပါဝင်ပံ့ပိုးမှု လုပ်ငန်းစဉ်သည် မိတ်ဆက်စိတ်ထားနှင့် ထောက်ပံ့မှု စနစ်ဖြစ်သောကြောင့် ပူးပေါင်းမှုအများစုတွင် Contributor License Agreement (CLA) လိုအပ်သော်လည်း စက်တင် အရည်အချင်းရှိကိရိယာများဖြင့် လိုအပ်သည့် လုပ်ငန်းစဉ်ကို လွယ်ကူစွာ ဦးဆောင်ပါလိမ့်မည်။

## 📜 အမှတ်အသားဖွင့် သင်ယူမှု

ဒီ သင်ကြားမှုအစုံလုံးကို MIT [LICENSE](../../LICENSE) လိုင်စင်ဖြင့် လွတ်လပ်စွာ အသုံးပြု၊ ပြုပြင်နှင့် မျှဝေရန် ရရှိနိုင်သည်။ ဒါက MCP အသိပညာကို developer များအားလုံး အဆင်ပြေစေရန် မစ်ရှင်ကို ထောက်ပံ့ပေးသည်။
## 🤝 ပါဝင်ဆောင်ရွက်မှု ညွှန်ကြားချက်များ

ဒီ ပရောဂျက်သည် ပါဝင်မှုများနှင့် အကြံပြုချက်များကို ကြိုဆိုပါသည်။ တစ်ချို့ပါဝင်မှုများတွင် Contributor License Agreement (CLA) ကို သဘောတူ ဖို့လိုသည်။
Contributor License Agreement သည် သင်၏ ပါဝင်မှုကို သင်သည် လမ်းညွှန်ခွင့်ရှိတယ်၊ လက်တွေ့ပိုင်ဆိုင်တယ်ဆိုတာကို အတည်ပြုပါသည်။
အသေးစိတ်အချက်အလက်များအတွက် <https://cla.opensource.microsoft.com> သို့ သွားရောက်ကြည့်ရှုနိုင်ပါသည်။


သင် pull request တင်တဲ့အခါမှာ CLA bot က သင့်အနေနဲ့ CLA ပေးပို့ရမလား၊
PR ကို သင့်တင့်အောင် ချိန်ညှိပေးမှာကို မော်တော်ဖြင့် ဆုံးဖြတ်ပေးပါလိမ့်မယ် (ဥပမာ - status check၊ comment)။
bot ပေးထားတဲ့ ညွှန်ကြားချက်များအတိုင်း လိုက်နာပေးလိုက်ရုံပါပဲ။


ဒီ project က [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/) ကို အသုံးပြုထားပါတယ်။
ပိုမိုသိရှိလိုပါက [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) ကို ကြည့်ရှုပါ၊



*MCP ခရီးစဉ်ကို စတင်ဖို့ အသင့်ဖြစ်ပြီလား? [Module 00 - Introduction to MCP](./00-Introduction/README.md) နဲ့ စတင်ပြီး Model Context Protocol ဖွံ့ဖြိုးတိုးတက်မှုရဲ့ ပထမဆုံးခြေလှမ်းတွေကို ချင်းချင်းသွားလိုက်ပါ!*



## 🎒 အခြားသင်တန်းများ
ကျွန်ုပ်တို့အဖွဲ့က အခြားသင်တန်းတွေကိုလည်း ထုတ်လုပ်ပါတယ်! စစ်ဆေးကြည့်ပါ -

<!-- CO-OP TRANSLATOR OTHER COURSES START -->
### LangChain
[![LangChain4j for Beginners](https://img.shields.io/badge/LangChain4j%20for%20Beginners-22C55E?style=for-the-badge&&labelColor=E5E7EB&color=0553D6)](https://aka.ms/langchain4j-for-beginners)
[![LangChain.js for Beginners](https://img.shields.io/badge/LangChain.js%20for%20Beginners-22C55E?style=for-the-badge&labelColor=E5E7EB&color=0553D6)](https://aka.ms/langchainjs-for-beginners?WT.mc_id=m365-94501-dwahlin)
[![LangChain for Beginners](https://img.shields.io/badge/LangChain%20for%20Beginners-22C55E?style=for-the-badge&labelColor=E5E7EB&color=0553D6)](https://github.com/microsoft/langchain-for-beginners?WT.mc_id=m365-94501-dwahlin)
---

### Azure / Edge / MCP / Agents
[![AZD for Beginners](https://img.shields.io/badge/AZD%20for%20Beginners-0078D4?style=for-the-badge&labelColor=E5E7EB&color=0078D4)](https://github.com/microsoft/AZD-for-beginners?WT.mc_id=academic-105485-koreyst)
[![Edge AI for Beginners](https://img.shields.io/badge/Edge%20AI%20for%20Beginners-00B8E4?style=for-the-badge&labelColor=E5E7EB&color=00B8E4)](https://github.com/microsoft/edgeai-for-beginners?WT.mc_id=academic-105485-koreyst)
[![MCP for Beginners](https://img.shields.io/badge/MCP%20for%20Beginners-009688?style=for-the-badge&labelColor=E5E7EB&color=009688)](https://github.com/microsoft/mcp-for-beginners?WT.mc_id=academic-105485-koreyst)
[![AI Agents for Beginners](https://img.shields.io/badge/AI%20Agents%20for%20Beginners-00C49A?style=for-the-badge&labelColor=E5E7EB&color=00C49A)](https://github.com/microsoft/ai-agents-for-beginners?WT.mc_id=academic-105485-koreyst)

---
 
### Generative AI စီးရီး
[![Generative AI for Beginners](https://img.shields.io/badge/Generative%20AI%20for%20Beginners-8B5CF6?style=for-the-badge&labelColor=E5E7EB&color=8B5CF6)](https://github.com/microsoft/generative-ai-for-beginners?WT.mc_id=academic-105485-koreyst)
[![Generative AI (.NET)](https://img.shields.io/badge/Generative%20AI%20(.NET)-9333EA?style=for-the-badge&labelColor=E5E7EB&color=9333EA)](https://github.com/microsoft/Generative-AI-for-beginners-dotnet?WT.mc_id=academic-105485-koreyst)
[![Generative AI (Java)](https://img.shields.io/badge/Generative%20AI%20(Java)-C084FC?style=for-the-badge&labelColor=E5E7EB&color=C084FC)](https://github.com/microsoft/generative-ai-for-beginners-java?WT.mc_id=academic-105485-koreyst)
[![Generative AI (JavaScript)](https://img.shields.io/badge/Generative%20AI%20(JavaScript)-E879F9?style=for-the-badge&labelColor=E5E7EB&color=E879F9)](https://github.com/microsoft/generative-ai-with-javascript?WT.mc_id=academic-105485-koreyst)

---
 
### အခြေခံသင်ယူမှု
[![ML for Beginners](https://img.shields.io/badge/ML%20for%20Beginners-22C55E?style=for-the-badge&labelColor=E5E7EB&color=22C55E)](https://aka.ms/ml-beginners?WT.mc_id=academic-105485-koreyst)
[![Data Science for Beginners](https://img.shields.io/badge/Data%20Science%20for%20Beginners-84CC16?style=for-the-badge&labelColor=E5E7EB&color=84CC16)](https://aka.ms/datascience-beginners?WT.mc_id=academic-105485-koreyst)
[![AI for Beginners](https://img.shields.io/badge/AI%20for%20Beginners-A3E635?style=for-the-badge&labelColor=E5E7EB&color=A3E635)](https://aka.ms/ai-beginners?WT.mc_id=academic-105485-koreyst)
[![Cybersecurity for Beginners](https://img.shields.io/badge/Cybersecurity%20for%20Beginners-F97316?style=for-the-badge&labelColor=E5E7EB&color=F97316)](https://github.com/microsoft/Security-101?WT.mc_id=academic-96948-sayoung)

[![သင်တန်းသားများအတွက် ဝက်ဘ်ဖွံ့ဖြိုးတိုးတက်မှု](https://img.shields.io/badge/Web%20Dev%20for%20Beginners-EC4899?style=for-the-badge&labelColor=E5E7EB&color=EC4899)](https://aka.ms/webdev-beginners?WT.mc_id=academic-105485-koreyst)
[![သင်တန်းသားများအတွက် IoT](https://img.shields.io/badge/IoT%20for%20Beginners-14B8A6?style=for-the-badge&labelColor=E5E7EB&color=14B8A6)](https://aka.ms/iot-beginners?WT.mc_id=academic-105485-koreyst)
[![သင်တန်းသားများအတွက် XR ဖွံ့ဖြိုးတိုးတက်မှု](https://img.shields.io/badge/XR%20Development%20for%20Beginners-38BDF8?style=for-the-badge&labelColor=E5E7EB&color=38BDF8)](https://github.com/microsoft/xr-development-for-beginners?WT.mc_id=academic-105485-koreyst)

---
 
### Copilot အစီးရီး
[![AI နှင့်ပူးပေါင်းရေးသားရေးအတွက် Copilot](https://img.shields.io/badge/Copilot%20for%20AI%20Paired%20Programming-FACC15?style=for-the-badge&labelColor=E5E7EB&color=FACC15)](https://aka.ms/GitHubCopilotAI?WT.mc_id=academic-105485-koreyst)
[![C#/.NET အတွက် Copilot](https://img.shields.io/badge/Copilot%20for%20C%23/.NET-FBBF24?style=for-the-badge&labelColor=E5E7EB&color=FBBF24)](https://github.com/microsoft/mastering-github-copilot-for-dotnet-csharp-developers?WT.mc_id=academic-105485-koreyst)
[![Copilot စွန့်စားခန်း](https://img.shields.io/badge/Copilot%20Adventure-FDE68A?style=for-the-badge&labelColor=E5E7EB&color=FDE68A)](https://github.com/microsoft/CopilotAdventures?WT.mc_id=academic-105485-koreyst)
<!-- CO-OP TRANSLATOR OTHER COURSES END -->

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ပြောကြားချက်**
ဤစာတမ်းကို AI ဘာသာပြန်ဝန်ဆောင်မှု [Co-op Translator](https://github.com/Azure/co-op-translator) အသုံးပြု၍ ဘာသာပြန်ထားပါသည်။ ကျွန်ုပ်တို့သည် တိကျမှန်ကန်မှုအတွက် ကြိုးပမ်းနေသော်လည်း၊ စက်ကိရိယာဘာသာပြန်ခြင်းများတွင် အမှားများ သို့မဟုတ် မှားယွင်းချက်များ ပါဝင်နိုင်ကြောင်း သတိပြုပါရန် လိုအပ်ပါသည်။ မူလစာတမ်းကို မူရင်းဘာသာဖြင့်သာ ယုံကြည်စိတ်ချရသော အချက်အလက်အဖြစ် သတ်မှတ်သင့်သည်။ အရေးကြီးသည့် သတင်းအချက်အလက်များအတွက် ပရော်ဖက်ရှင်နယ် လူသားဘာသာပြန်သူဝန်ဆောင်မှုကို အကြံပြုပါသည်။ ဤဘာသာပြန်ချက်ကို အသုံးပြုခြင်းမှ ဖြစ်ပေါ်လာသော နားလည်မှုကွာခြားမှုများ သို့မဟုတ် မမှန်ကန်သော အသုံးပြုမှုများအတွက် ကျွန်ုပ်တို့ တာဝန်မခံပါ။
<!-- CO-OP TRANSLATOR DISCLAIMER END -->