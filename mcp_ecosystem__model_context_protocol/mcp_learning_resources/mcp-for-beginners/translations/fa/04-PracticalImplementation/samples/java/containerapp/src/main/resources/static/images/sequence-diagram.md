```mermaid
sequenceDiagram
    actor User
    participant WebApp as برنامه وب<br/>(ContentSafetyController)
    participant SafetyService as سرویس امنیت محتوا
    participant AzureAPI as API امنیت محتوا Azure
    participant LangChain as LangChain4j
    participant McpClient as کلاینت MCP
    participant McpServer as سرور ماشین حساب MCP<br/>(پورت ۸۰۸۰)
    participant CalcService as سرویس ماشین حساب

    %% تعامل کاربر
    User->>WebApp: وارد کردن درخواست محاسبه
    WebApp->>WebApp: ساخت PromptRequest

    %% بررسی امنیت محتوا
    WebApp->>SafetyService: processPrompt(prompt)
    SafetyService->>AzureAPI: analyzeText(prompt)
    AzureAPI-->>SafetyService: AnalyzeTextResult
    SafetyService->>SafetyService: بررسی ایمنی محتوا<br/>(شدت < ۲ برای همه دسته‌ها)

    %% جریان پردازش - محتوای ایمن
    alt محتوا ایمن است
        SafetyService->>LangChain: ارسال درخواست به Bot.chat()
        LangChain->>McpClient: پردازش درخواست
        McpClient->>McpServer: فراخوانی ابزار ماشین حساب مناسب از طریق SSE
        McpServer->>CalcService: اجرای محاسبه<br/>(جمع، تفریق، ضرب و غیره)
        CalcService-->>McpServer: نتیجه محاسبه
        McpServer-->>McpClient: نتیجه اجرای ابزار
        McpClient-->>LangChain: نتیجه ابزار
        LangChain-->>SafetyService: پاسخ ربات
        SafetyService-->>WebApp: بازگرداندن نقشه نتیجه<br/>{isSafe: "true", botResponse: result, safetyResult: details}
        WebApp-->>User: نمایش نتیجه محاسبه و اطلاعات ایمنی
    else محتوا ناایمن است
        SafetyService-->>WebApp: بازگرداندن نقشه نتیجه<br/>{isSafe: "false", safetyResult: details}
        WebApp-->>User: نمایش هشدار ایمنی<br/>(بدون محاسبه)
    end
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**سلب مسئولیت**:
این سند با استفاده از سرویس ترجمه هوش مصنوعی [Co-op Translator](https://github.com/Azure/co-op-translator) ترجمه شده است. در حالی که ما در تلاش برای دقت هستیم، لطفاً توجه داشته باشید که ترجمه‌های خودکار ممکن است شامل خطاها یا نادرستی‌هایی باشند. سند اصلی به زبان مادری خود باید به عنوان منبع معتبر در نظر گرفته شود. برای اطلاعات حیاتی، ترجمه حرفه‌ای انسانی توصیه می‌شود. ما در قبال هرگونه سوء تفاهم یا برداشت نادرست ناشی از استفاده از این ترجمه مسئولیتی نداریم.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->