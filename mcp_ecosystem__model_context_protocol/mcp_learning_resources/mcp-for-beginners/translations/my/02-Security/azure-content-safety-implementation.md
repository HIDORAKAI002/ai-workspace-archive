# MCP နှင့် အတူ Azure Content Safety ကို အကောင်အထည်ဖော်ခြင်း

> **OWASP MCP ရှင်းပြချက်**: [MCP06 - မျှော်မှန်းချက်လမ်းကြောင်းဖျက်ဆီးခြင်း](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

prompt injection, tool poisoning, နှင့် အခြား AI သီးသန့် လူကြိုက်များသောအားနည်းချက်များအပေါ်မှ ကာကွယ်ရန် MCP ဘေးလုံခြုံရေးအား တိုးတက်စေရန် Azure Content Safety ကို ပေါင်းစပ်အသုံးပြုရန် အထူးအကြံပြုပါသည်။ ၎င်း အကောင်အထည်ဖော်မှုလမ်းညွှန်သည် [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O Security အတိုင်း ကိုက်ညီသည်။

## MCP Server နှင့် ပေါင်းစပ်ခြင်း

Azure Content Safety ကို သင့် MCP server နှင့် ပေါင်းစပ်ရန် အောက်ပါအတိုင်း မက်လ်ဝဲဖြစ်သည့် content safety filter ကို တောင်းဆိုမှုများကို ကိုင်တွယ်တဲ့ ပိုင်းတွင် ထည့်သွင်းပါ။

1. ဆာဗာစတင်ချိန်တွင် filter ကို စတင်ဖန်တီးပါ
2. ကုန်ပစ္စည်း အသုံးပြုမည့်တောင်းဆိုမှုအားလုံးကို ထိန်းစစ်ပါ
3. ပြန်လည်ပို့ဆောင်မည့် တုံ့ပြန်ချက်အားလုံးကိုစစ်ဆေးပါ
4. လုံခြုံရေးချိုးဖောက်မှုများကို မှတ်တမ်းတင်ပြီး သတိပေးပါ
5. အဆင့်မပြည့် content safety စစ်ဆေးမှုများအတွက် လိုအပ်သလို error handling ကို ဖန်တီးပါ

၎င်းသည် အောက်ပါအချက်များကို တိုက်ဖျက်ကာကွယ်ပေးသည် -
- prompt injection တိုက်ခိုက်မှုများ
- tool poisoning ကြိုးပမ်းမှုများ
- မကောင်းသောအချက်အလက် ထုတ်ယူခြင်း
- အန္တရာယ်ရှိသော အကြောင်းအရာ တို့ ဖန်တီးခြင်း

## Azure Content Safety ပေါင်းစပ်ရာတွင် အကောင်းဆုံး လေ့ကျင့်မှုများ

1. **စိတ်ကြိုက် Blocklists**: MCP injection များအတွက် စိတ်ကြိုက် blocklists များ ပြုလုပ်ပါ
2. **ပြင်းထန်မှု သတ်မှတ်ချက်များ**: သင့်အသုံးအဆောင်နှင့် ခြိမ်းခြောက်မှု အဆင့်မတူများကို မူတည်၍ ပြင်းထန်မှု ကန့်သတ်ချက်များကို ပြင်ဆင်ပါ
3. **အပြည့်အဝ ဖုံးလွှမ်းမှု**: ထည့်သွင်းမှုနှင့် ထွက်ရှိမှုအားလုံးတွင် content safety စစ်ဆေးမှုများတပ်ဆင်ပါ
4. **လုပ်ဆောင်မှု တိုးတက်မှု**: ထပ်မံကြိုးစားမှုများအတွက် caching များတပ်ဆင်ခြင်းကို စဉ်းစားပါ
5. **အသုံးပြုမှု လက်ချိုး စနစ်များ**: content safety ဝန်ဆောင်မှု မရနိုင်သည့်အခါ အပြန်အလှန် ကျင်းပမှုသတ်မှတ်ချက်များ ချမှတ်ပါ
6. **အသုံးပြုသူတုံ့ပြန်ချက်**: လုံခြုံမှုကြောင့် အကြောင်းအရာ ပိတ်ပင်မှုဖြစ်ပါက အသုံးပြုသူထံ သေချာမြင်သာသော တုံ့ပြန်ချက် ထုတ်ပေးပါ
7. **တိုးတက်လာမှု ဆက်လက်မှု**: အန္တရာယ်အသစ်များအပေါ်မူတည်၍ blocklists နှင့် patterns များကို ပုံမှန်ပြင်ဆင်ပါ

## အပိုဆောင်း အရင်းအမြစ်များ

### OWASP MCP လုံခြုံရေး လမ်းညွှန်ချက်

- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Azure ဖြင့် အပြည့်အစုံ OWASP MCP ထိပ်တန်း ၁၀
- [MCP06 - Prompt Injection](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - အသေးစိတ် prompt injection ပြဿနာဖြေရှင်း နည်းများ
- [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) - Camp 3: I/O Security အသုံးပြုမှု

### Azure စာတမ်းများ

- [Azure Content Safety Overview](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure AI Content Safety Quickstart](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)

## နောက်ဆက်တွဲ

- ပြန်သွားရန်: [Security Module Overview](./README.md)
- ဆက်လုပ်ရန်: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ပြောကြားချက်**
ဤစာတမ်းကို AI ဘာသာပြန်ဝန်ဆောင်မှု [Co-op Translator](https://github.com/Azure/co-op-translator) အသုံးပြု၍ ဘာသာပြန်ထားပါသည်။ ကျွန်ုပ်တို့သည် တိကျမှန်ကန်မှုအတွက် ကြိုးပမ်းနေသော်လည်း၊ စက်ကိရိယာဘာသာပြန်ခြင်းများတွင် အမှားများ သို့မဟုတ် မှားယွင်းချက်များ ပါဝင်နိုင်ကြောင်း သတိပြုပါရန် လိုအပ်ပါသည်။ မူလစာတမ်းကို မူရင်းဘာသာဖြင့်သာ ယုံကြည်စိတ်ချရသော အချက်အလက်အဖြစ် သတ်မှတ်သင့်သည်။ အရေးကြီးသည့် သတင်းအချက်အလက်များအတွက် ပရော်ဖက်ရှင်နယ် လူသားဘာသာပြန်သူဝန်ဆောင်မှုကို အကြံပြုပါသည်။ ဤဘာသာပြန်ချက်ကို အသုံးပြုခြင်းမှ ဖြစ်ပေါ်လာသော နားလည်မှုကွာခြားမှုများ သို့မဟုတ် မမှန်ကန်သော အသုံးပြုမှုများအတွက် ကျွန်ုပ်တို့ တာဝန်မခံပါ။
<!-- CO-OP TRANSLATOR DISCLAIMER END -->