# Azure Content Safety နှင့် အဆင့်မြင့် MCP လုံခြုံမှု

> **OWASP MCP အန္တရာယ် ဖြေရှင်းမှု**: [MCP06 - Contextual Payloads မှတဆင့် Prompt Injection](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety သည် သင့် MCP အကောင်အထည်ဖော်မှုများ၏ လုံခြုံမှုကို မြှင့်တင်ရန် အင်အားကြီးသောကိရိယာများကို ပေးသည်။ လက်တွေ့ အကောင်အထည်ဖော်မှု အတွေ့အကြုံရရှိရန် [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O Security ကို ကြည့်ပါ။

## Prompt Shields

Microsoft ၏ AI Prompt Shields သည် တိုက်ရိုက်နှင့် မတိုက်ရိုက် prompt injection ကာကွယ်မှုအား များစွာပေးသည့် ကာကွယ်မှုများကို ပံ့ပိုးပေးသည်-

1. **အဆင့်မြင့်ရှာဖွေမှု**: အကြောင်းအရာအတွင်း ထည့်သွင်းထားသော မကောင်းမွန်သောညွှန်ကြားချက်များကို စက်သင်ယူမှုဖြင့် ဖော်ထုတ်သည်။
2. **Spotlighting**: AI စနစ်များအား အတည်ပြုညွှန်ကြားချက်များနှင့် ပြင်ပထည့်သွင်းချက်များကို ခွဲနိုင်ရန် အကူအညီပြုရန် အထွက်စာသားကို ပြောင်းလဲပေးသည်။
3. **Delimiters နှင့် Datamarking**: ယုံကြည်စိတ်ချရသော ဒေတာနှင့် မယုံကြည်ရသော ဒေတာအကြား အနားစွန်းများကို အမှတ်တံဆိပ်ဖြင့် ဖော်ပြသည်။
4. **Content Safety Integration**: jailbreak ကြိုးစားမှုများနှင့် အန္တရာယ်ရှိသော အကြောင်းအရာများကို ရှာဖွေဖို့ Azure AI Content Safety နှင့် ပူးပေါင်းလုပ်ဆောင်သည်။
5. **ဆက်လက်မွမ်းမံမှုများ**: Microsoft သည် အသစ်ထွက်ပေါ်လာသော မုန်တိုင်းအန္တရာယ်များအပေါ် ကာကွယ်မှု မက်ခရနစ်များကို မကြာခဏ အပ်ဒိတ်လုပ်သည်။

## MCP နှင့် Azure Content Safety ကို မည်သို့ အကောင်အထည်ဖော်မည်

ဤနည်းလမ်းသည် အလွှာအများအပြားသော ကာကွယ်မှုကို ပေးသည်-
- ကိုင်တွယ်မှုမပြုမီ ဝင်ရောက်သော အချက်အလက်များကို စစ်ဆေးခြင်း
- ပြန်ပေးပို့မည့် အချက်အလက်များကို အတည်ပြုခြင်း
- ကြိုတင်သိထားသော အန္တရာယ်ရှိမှုပုံစံများအား blocklists အသုံးပြုခြင်း
- Azure ၏ ဆက်လက်မွမ်းမံနေသည့် content safety မော်ဒယ်များကို အကျိုးပြုဖော်ဆောင်ခြင်း

## Azure Content Safety အရင်းအမြစ်များ

သင့် MCP ဆာဗာများနှင့် Azure Content Safety ကို အကောင်အထည်ဖော်နည်းပိုမိုလေ့လာလိုပါက အောက်ပါ တရားဝင်အရင်းအမြစ်များကို ရှာဖွေကြည့်ပါ-

1. [Azure AI Content Safety Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/) - Azure Content Safety အတွက် တရားဝင်စာတမ်းများ။
2. [Prompt Shield Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - prompt injection ကာကွယ်နည်းလမ်းများ။
3. [Content Safety API Reference](https://learn.microsoft.com/rest/api/contentsafety/) - Content Safety ကို အကောင်အထည်ဖော်ရန် အသေးစိတ် API ကိုးကားချက်။
4. [Quickstart: Azure Content Safety with C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - C# ဖြင့် အကောင်အထည်ဖော်ခြင်း လမ်းညွှန်ချက်။
5. [Content Safety Client Libraries](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - မတူညီသော programming ဘာသာစကားများအတွက် client libraries။
6. [Detecting Jailbreak Attempts](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - jailbreak ကြိုးစားမှုများကို ရှာဖွေရန်နှင့် ကာကွယ်ရန် အထူးသတိပြုချက်။
7. [Best Practices for Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Content Safety ကို ထိရောက်စွာ အကောင်အထည်ဖော်ရန်အတွက် အကောင်းဆုံး လေ့လာမှုနည်းလမ်းများ။

ပိုမိုအသေးစိတ် အကောင်အထည်ဖော်မှုအတွက် ကျွန်ုပ်တို့၏ [Azure Content Safety Implementation guide](./azure-content-safety-implementation.md) ကို ကြည့်ပါ။

## ရုပ်သိမ်းရန်

- ဖတ်ရန်: [Azure Content Safety Implementation](./azure-content-safety-implementation.md)
- ပြန်သွားရန်: [Security Module Overview](./README.md)
- ဆက်ရန်: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**အသိပေးချက်**  
ဤစာရွက်စာတမ်းကို AI ဘာသာပြန်ဝန်ဆောင်မှု [Co-op Translator](https://github.com/Azure/co-op-translator) ဖြင့် ဘာသာပြန်ထားပါသည်။ တိကျမှုအတွက် ကြိုးပမ်းပါသော်လည်း၊ စက်မှ ဘာသာပြန်ထားမှုများတွင် အမှားများ သို့မဟုတ်မှားယွင်းချက်များ ပါနိုင်ကြောင်း သတိပြုပါရန် ဖြစ်ပါသည်။ မူရင်းစာရွက်စာတမ်းကို၎င်း ကနဦးဘာသာဖြင့်သာ ယုံကြည်ရမည့် အရင်းအမြစ်အဖြစ် စဉ်းစားသင့်ပါသည်။ အရေးပါသော သတင်းအချက်အလက်များအတွက် ပရော်ဖက်ရှင်နယ် လူသားဘာသာပြန်ခြင်းကို အကြံပြုပါသည်။ ဤဘာသာပြန်ချက်ကို အသုံးပြုပြီး ဖြစ်ပေါ်လာသည့် နားမလည်မှုများ သို့မဟုတ် မှားယွင်းသုံးသပ်မှုများအတွက် ကျနော်တို့ မည်သည့် တာဝန်မှလည်း မယူဆောင်ပါ။
<!-- CO-OP TRANSLATOR DISCLAIMER END -->