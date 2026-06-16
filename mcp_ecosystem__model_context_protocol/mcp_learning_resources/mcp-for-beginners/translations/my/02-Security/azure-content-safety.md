# Azure Content Safety ဖြင့် အဆင့်မြင့် MCP လုံခြုံရေး

> **OWASP MCP မှ တုံ့ပြန်လျက်ရှိသော အန္တရာယ်**: [MCP06 - ရည်ရွယ်ချက် လွှဲပြောင်းမှု](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety သည် သင့် MCP အကောင်အထည်ဖော်မှုများ၏ လုံခြုံရေးကိုအားကောင်းစွာတိုးတက်စေနိုင်သည့် စွမ်းဆောင်ရည်မြင့်ကိရိယာများစွာကို ပံ့ပိုးပေးသည်။ လက်တွေ့အသုံးပြုမှုအတွေ့အကြုံအတွက် [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O Security ကို ကြည့်ပါ။

## Prompt Shields

Microsoft ၏ AI Prompt Shields သည် တိုက်ရိုက်အပြီးနှင့် ပုဂ္ဂိုလ်တစ်ယောက်မှ မကောင်းသော prompt ထည့်သွင်းမှုတိုက်ခိုက်မှုများအား ခိုင်မာစွာ ကာကွယ်ပေးသည်-

1. **တိုးတက်သော စစ်ဆေးမှု**: အကြောင်းအရာထဲတွင် ထည့်သွင်းထားသော မကောင်းသောညွှန်ကြားချက်များကို စက်သင်ကြားခြင်းဖြင့် မှတ်မိစစ်ဆေးသည်။
2. **ဖော်ပြမှု (Spotlighting)**: AI စနစ်များအတွက် မှန်ကန်သောညွှန်ကြားချက်များနှင့် ပြင်ပထည့်သွင်းချက်များကို ခြားနားစေသည်။
3. **အတွင်း နယ်နိမိတ်များနှင့် ဒေတာတံဆိပ်ခတ်ခြင်း**: ယုံကြည်နိုင်သော ဒေတာနှင့် မယုံကြည်ရသော ဒေတာများအကြား နယ်နိမိတ်များကို မှတ်သားသည်။
4. **Content Safety ပေါင်းစပ်ခြင်း**: Azure AI Content Safety ဖြစ်ပေါ်မှုမှားထွက်နော် နှင့် အဆိုးကျိုးဖြစ်စေသည့်အကြောင်းအရာများကို ရှာဖွေသည်။
5. **မပြတ်တမ်း အပ်ဒိတ်များ**: Microsoft သည် ခိုင်မာသောလုံခြုံရေးစနစ်များကို ပုံမှန် အပ်ဒိတ်လုပ်ပေးသည်။

## Azure Content Safety ကို MCP နဲ့ အကောင်အထည်ဖော်ခြင်း

ဒီနည်းလမ်းက လုံခြုံရေးအဆင့်များစွာ ပေးသည်။
- လုပ်ဆောင်စဉ်မတိုင်မီ ထည့်သွင်းချက်များ စစ်ဆေးခြင်း
- ထွက်ရှိမှုများကို ပြန်လည်ထုတ်ပြန်ရရှိမည့်အချိန်တွင် စစ်ဆေးတင်ပြခြင်း
- အဆိုးကျိုးရှိသော စနစ်များအတွက် blocklist များကို အသုံးပြုခြင်း
- Azure ၏ မပြတ်တမ်းအပ်ဒိတ်လုပ်သော content safety မော်ဒယ်များကို အသုံးပြုခြင်း

## Azure Content Safety အရင်းအမြစ်များ

သင့် MCP ဆာဗာများတွင် Azure Content Safety ကို အကောင်အထည်ဖော်ရန် ပိုမိုသိရှိလိုပါက အောက်ပါ အတည်ပြုအရင်းအမြစ်များကို ကြည့်ရှုပါ။

1. [Azure AI Content Safety စာတမ်းများ](https://learn.microsoft.com/azure/ai-services/content-safety/) - Azure Content Safety အတွက် တရားဝင် စာတမ်းများ။
2. [Prompt Shield စာတမ်းများ](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - prompt injection တိုက်ခိုက်မှုများကို မဖြစ်စေရန် သင်ယူပါ။
3. [Content Safety API ကိုရင်းမြစ်](https://learn.microsoft.com/rest/api/contentsafety/) - Content Safety ကို အကောင်အထည်ဖော်ရာ API အသုံးပြုသူလမ်းညွှန်။
4. [Quickstart: Azure Content Safety နှင့် C# ဖြင့်](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - C# ဖြင့် လျင်မြန်စွာ အကောင်အထည်ဖော်ခြင်း လမ်းညွှန်။
5. [Content Safety Client Libraries](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - ဘာသာစကားအမျိုးမျိုးအတွက် Client Libraries များ။
6. [Jailbreak လုပ်ရန် ကြိုးစားမှုတွေ ရှာဖွေခြင်း](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - jailbreak မဖြစ်စေဖို့ ဉပမာပြချက်များ။
7. [Content Safety အတွက် အကောင်းဆုံး လေ့လာမှုများ](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - content safety ကို ထိရောက်စွာ အကောင်အထည်ဖေါ်ရာ အကောင်းဆုံး လေ့လာမှုများ။

ပိုမိုအသေးစိတ် အကောင်အထည်ဖော်ခြင်းအတွက် ကျွန်ုပ်တို့၏ [Azure Content Safety Implementation လမ်းညွှန်](./azure-content-safety-implementation.md) ကို ကြည့်ပါ။

## နောက်တစ်ဆင့်

- ဖတ်ပါ: [Azure Content Safety Implementation](./azure-content-safety-implementation.md)
- ပြန်သွားပါ: [Security Module Overview](./README.md)
- ဆက်လက်ပါ: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ပြောကြားချက်**
ဤစာတမ်းကို AI ဘာသာပြန်ဝန်ဆောင်မှု [Co-op Translator](https://github.com/Azure/co-op-translator) အသုံးပြု၍ ဘာသာပြန်ထားပါသည်။ ကျွန်ုပ်တို့သည် တိကျမှန်ကန်မှုအတွက် ကြိုးပမ်းနေသော်လည်း၊ စက်ကိရိယာဘာသာပြန်ခြင်းများတွင် အမှားများ သို့မဟုတ် မှားယွင်းချက်များ ပါဝင်နိုင်ကြောင်း သတိပြုပါရန် လိုအပ်ပါသည်။ မူလစာတမ်းကို မူရင်းဘာသာဖြင့်သာ ယုံကြည်စိတ်ချရသော အချက်အလက်အဖြစ် သတ်မှတ်သင့်သည်။ အရေးကြီးသည့် သတင်းအချက်အလက်များအတွက် ပရော်ဖက်ရှင်နယ် လူသားဘာသာပြန်သူဝန်ဆောင်မှုကို အကြံပြုပါသည်။ ဤဘာသာပြန်ချက်ကို အသုံးပြုခြင်းမှ ဖြစ်ပေါ်လာသော နားလည်မှုကွာခြားမှုများ သို့မဟုတ် မမှန်ကန်သော အသုံးပြုမှုများအတွက် ကျွန်ုပ်တို့ တာဝန်မခံပါ။
<!-- CO-OP TRANSLATOR DISCLAIMER END -->