```mermaid
sequenceDiagram
    actor User
    participant WebApp as ဝက်ဘ် အက်ပ်<br/>(ContentSafetyController)
    participant SafetyService as အကြောင်းအချက် ဘေးကင်းမှု ဝန်ဆောင်မှု
    participant AzureAPI as Azure အကြောင်းအချက် ဘေးကင်းမှု API
    participant LangChain as LangChain4j
    participant McpClient as MCP Client
    participant McpServer as MCP ကဏ္ဍတွက် Server<br/>(ပို့ 8080)
    participant CalcService as ကဏ္ဍတွက် ဝန်ဆောင်မှု

    %% အသုံးပြုသူ အပြန်အလှန်ဆက်သွယ်မှု
    User->>WebApp: ကဏ္ဍတွက် ထောက်ခံချက် ရိုက်ထည့်ပါ
    WebApp->>WebApp: PromptRequest ဖန်တီးပါ

    %% အကြောင်းအချက် ဘေးကင်းမှု စစ်ဆေးခြင်း
    WebApp->>SafetyService: processPrompt(prompt)
    SafetyService->>AzureAPI: analyzeText(prompt)
    AzureAPI-->>SafetyService: AnalyzeTextResult
    SafetyService->>SafetyService: အကြောင်းအချက် ဘေးကင်းမည့် အခြေအနေ စစ်ဆေးခြင်း<br/>(အမျိုးအစားအားလုံးအတွက် တင်းကြပ်မှု < 2)

    %% လုပ်ငန်းစဉ် စနစ် - ဘေးကင်းသော အကြောင်းအချက်
    alt အကြောင်းအချက် များသည် ဘေးကင်းပါသည်
        SafetyService->>LangChain: prompt ကို Bot.chat() သို့ ပေးပို့ပါ
        LangChain->>McpClient: prompt ကိုလုပ်ဆောင်ပါ
        McpClient->>McpServer: SSE ဖြင့် သင့်လျော်သော ကဏ္ဍတွက် စက်တစ်ခုကို ခေါ်ရန်
        McpServer->>CalcService: ကဏ္ဍတွက် ကိုဆောင်ရွက်ပါ<br/>(ထည့်၊ ဖြုတ်၊ တိုး၊ စသည်များ)
        CalcService-->>McpServer: ကဏ္ဍတွက် ရလဒ်
        McpServer-->>McpClient: ကိရိယာ စဉ်ဆက်မှုရလဒ်
        McpClient-->>LangChain: ကိရိယာ ရလဒ်
        LangChain-->>SafetyService: Bot အဖြေ
        SafetyService-->>WebApp: ရလဒ် မြေပုံ ပြန်ပို့ပါ<br/>{isSafe: "true", botResponse: result, safetyResult: details}
        WebApp-->>User: ကဏ္ဍတွက် ရလဒ်နှင့် ဘေးကင်းမှုပြုချက် ထောင့်ပြရန်
    else အကြောင်းအချက် များသည် ဘေးအန္တရာယ်ရှိသည်
        SafetyService-->>WebApp: ရလဒ် မြေပုံ ပြန်ပို့ပါ<br/>{isSafe: "false", safetyResult: details}
        WebApp-->>User: ဘေးကင်းမှု သတိပေးချက် ပြသပါ<br/>(ကဏ္ဍတွက်မပါ)
    end
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ပြောကြားချက်**
ဤစာတမ်းကို AI ဘာသာပြန်ဝန်ဆောင်မှု [Co-op Translator](https://github.com/Azure/co-op-translator) အသုံးပြု၍ ဘာသာပြန်ထားပါသည်။ ကျွန်ုပ်တို့သည် တိကျမှန်ကန်မှုအတွက် ကြိုးပမ်းနေသော်လည်း၊ စက်ကိရိယာဘာသာပြန်ခြင်းများတွင် အမှားများ သို့မဟုတ် မှားယွင်းချက်များ ပါဝင်နိုင်ကြောင်း သတိပြုပါရန် လိုအပ်ပါသည်။ မူလစာတမ်းကို မူရင်းဘာသာဖြင့်သာ ယုံကြည်စိတ်ချရသော အချက်အလက်အဖြစ် သတ်မှတ်သင့်သည်။ အရေးကြီးသည့် သတင်းအချက်အလက်များအတွက် ပရော်ဖက်ရှင်နယ် လူသားဘာသာပြန်သူဝန်ဆောင်မှုကို အကြံပြုပါသည်။ ဤဘာသာပြန်ချက်ကို အသုံးပြုခြင်းမှ ဖြစ်ပေါ်လာသော နားလည်မှုကွာခြားမှုများ သို့မဟုတ် မမှန်ကန်သော အသုံးပြုမှုများအတွက် ကျွန်ုပ်တို့ တာဝန်မခံပါ။
<!-- CO-OP TRANSLATOR DISCLAIMER END -->