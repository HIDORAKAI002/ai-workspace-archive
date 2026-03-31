# MCP နှင့် Azure Content Safety ကို အကောင်အထည်ဖော်ခြင်း

> **OWASP MCP လုံခြုံရေး အန္တရာယ်များကို ကာကွယ်ခြင်း**: [MCP06 - Contextual Payloads ၏ Prompt Injection](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Prompt injection, tool poisoning နှင့် အခြား AI အသုံးပြုတဲ့ ထိခိုက်နိုင်စရာများအပေါ် MCP လုံခြုံရေးကို အားကောင်းစေဖို့ Azure Content Safety ကို ပေါင်းစည်းအသုံးပြုဖို့ အလွန်အကြံပြုသည်။ ဤ အကောင်အထည်ဖော်ခြင်းလမ်းညွှန်သည် [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O Security နှင့် ကိုက်ညီပါသည်။

## MCP ဆာဗာနှင့် ပေါင်းစည်းခြင်း

Azure Content Safety ကို သင့် MCP ဆာဗာတွင် ပေါင်းစည်းရန် အောက်ပါအတိုင်း request processing pipeline တွင် middleware အနေနှင့် content safety filter ကို ထည့်ပါ။

1. ဆာဗာ စတင်လည်ပတ်ချိန် filter ကို initialize လုပ်ရန်
2. အကုန်အလုံး tool requests များကို စစ်ဆေးရန်
3. အကုန်အလုံး responses များကို client များသို့ ပြန်ပေးမည့်မတိုင်ခင် စစ်ဆေးရန်
4. Safety အညွှန်းခွဲချက်များ ပေါ်လာပါက log ထားခြင်းနှင့် အသိပေးခြင်း
5. Content safety စစ်ဆေးမှု မအောင်မြင်ပါက error handling ကို လိုက်နာကာ ဆောင်ရွက်ရန်

ဒါသည် အောက်ပါအရာများဆီမှ ပြင်းထန်သော ကာကွယ်မှုတစ်ခု ဖြစ်စေပါသည်-
- Prompt injection တိုက်ခိုက်မှုများ
- Tool poisoning ကြိုးစားမှုများ
- မကောင်းမှုအချက်အလက်များ ပေးပို့ခြင်းများ
- ဆိုးကျိုးရှိသော အကြောင်းအရာများ ဖန်တီးမှု

## Azure Content Safety ပေါင်းစည်းမှု အတွက် အကောင်းဆုံး လက်တွေ့အသုံးပြုဖို့အကြံပြုချက်များ

1. **စိတ်ကြိုက် Blocklists**: MCP injection ပုံစံများအတွက် စိတ်ကြိုက် blocklists များ ဖန်တီးပါ
2. **ထိခိုက်မှု ဆွဲချက်ကို ဆက်ကပ်ခြင်း**: သင့်အသုံးအဆောင်နှင့် အန္တရာယ်ခံနိုင်ရည်ကို အခြေခံ၍ ထိခိုက်မှု များကို ချိန်ညှိပါ
3. **ပြည့်စုံသော ကိုင်တွယ်မှု**: အဝင် အထွက်များ အားလုံးတွင် content safety စစ်ဆေးမှုများ ထည့်သွင်းထားပါ
4. **စွမ်းဆောင်ရည် မြှင့်တင်မှု**: အကြိမ်ကြိမ် ထပ်မံစစ်ဆေးမှုများအတွက် caching ကို သုံးစွဲဖို့ စဉ်းစားပါ
5. **Fallback မက်ကာနစ်မ်များ**: content safety ဝန်ဆောင်မှု မရရှိနိုင်သည့်အခါ ရှင်းလင်းတဲ့ fallback ဟန်ချက်များ သတ်မှတ်ပါ
6. **အသုံးပြုသူ တုံ့ပြန်ချက်**: မဲဆွယ်မှုကြောင့် content ပိတ်ထားရသည်ဆိုပါက အသုံးပြုသူများထံ သပ်ရပ် ကြည့်ရှုနိုင်သော တုံ့ပြန်ချက် ရှိစေပါ
7. **အဆက်မပြတ် တိုးတက်မှု**: ပေါ်ပေါက်လာသော အန္တရာယ်အသစ်များအတွက် blocklists နှင့် ပုံစံများကို ဒါရိုက်တစ်တိုင်း update လုပ်ပါ

## နောက်ထပ် ရင်းမြစ်များ

### OWASP MCP လုံခြုံရေးလမ်းညွှန်မှု
- [OWASP MCP Azure လုံခြုံရေးလမ်းညွှန်ချက်](https://microsoft.github.io/mcp-azure-security-guide/) - Azure ဖြင့် ပေါင်းစည်းထားသော OWASP MCP ထိပ်တန်း ၁၀
- [MCP06 - Prompt Injection](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - Prompt injection ကာကွယ်မှု ပုံစံအသေးစိတ်
- [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) - Camp 3: I/O Security တွင် content safety ကို လက်တွေ့ သင်ကြားမှု

### Azure စာတမ်းများ
- [Azure Content Safety အကျဉ်းချုပ်](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Prompt Shields စာတမ်းများ](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure AI Content Safety Quickstart](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)

## နောက်တစ်ဆင့်

- ပြန်သွားရန်: [Security Module Overview](./README.md)
- ဆက်လက်ဖတ်ရန်: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ချက်ချင်းမှတ်ချက်**  
ဤစာတမ်းကို AI ဘာသာပြန်မှုဝန်ဆောင်မှု [Co-op Translator](https://github.com/Azure/co-op-translator) အသုံးပြု၍ ဘာသာပြန်ထားပါသည်။ တိကျမှန်ကန်မှုအတွက် ကြိုးပမ်းကြောင်း သတိပေးပါသည်။ သို့သော် အလိုအလျောက် ဘာသာပြန်မှုတွင် အမှားများ သို့မဟုတ် အတိအကျမရှိမှုများ ဖြစ်ပေါ်နိုင်ပါသဖြင့် မူလစာတမ်း၏ မိခင်ဘာသာသည် တရားဝင်အချက်အလက်အရင်းအမြစ်အဖြစ် သတ်မှတ်ရန်လိုအပ်ပါသည်။ အရေးကြီးသတင်းအချက်အလက်များအတွက် လုပ်ငန်းကျွမ်းကျင် လူ့ဘာသာပြန်သူမှ ဘာသာပြန်မှုကို တိုက်တွန်းပါသည်။ ဤဘာသာပြန်မှုကို အသုံးပြုရာမှ ဖြစ်ပေါ်လာသော နားလည်မှုကွာခြားမှုများ သို့မဟုတ် မမှန်ကန်မှုများအတွက် ကျွန်ုပ်တို့ တာဝန်မယူပါ။
<!-- CO-OP TRANSLATOR DISCLAIMER END -->