```mermaid
sequenceDiagram
    actor User
    participant WebApp as تطبيق ويب<br/>(مراقب أمان المحتوى)
    participant SafetyService as خدمة أمان المحتوى
    participant AzureAPI as واجهة برمجة تطبيقات أمان المحتوى من أزور
    participant LangChain as LangChain4j
    participant McpClient as عميل MCP
    participant McpServer as خادم آلة حاسبة MCP<br/>(المنفذ 8080)
    participant CalcService as خدمة الآلة الحاسبة

    %% تفاعل المستخدم
    User->>WebApp: أدخل سؤال الحساب
    WebApp->>WebApp: إنشاء طلب السؤال

    %% فحص أمان المحتوى
    WebApp->>SafetyService: processPrompt(السؤال)
    SafetyService->>AzureAPI: analyzeText(السؤال)
    AzureAPI-->>SafetyService: نتيجة تحليل النص
    SafetyService->>SafetyService: التحقق من أمان المحتوى<br/>(شدة < 2 في جميع الفئات)

    %% تدفق المعالجة - محتوى آمن
    alt المحتوى آمن
        SafetyService->>LangChain: تمرير السؤال إلى Bot.chat()
        LangChain->>McpClient: معالجة السؤال
        McpClient->>McpServer: استدعاء أداة الآلة الحاسبة المناسبة عبر SSE
        McpServer->>CalcService: تنفيذ الحساب<br/>(جمع، طرح، ضرب، إلخ)
        CalcService-->>McpServer: نتيجة الحساب
        McpServer-->>McpClient: نتيجة تنفيذ الأداة
        McpClient-->>LangChain: نتيجة الأداة
        LangChain-->>SafetyService: استجابة البوت
        SafetyService-->>WebApp: إعادة خريطة النتائج<br/>{isSafe: "true", botResponse: النتيجة، safetyResult: التفاصيل}
        WebApp-->>User: عرض نتيجة الحساب ومعلومات الأمان
    else المحتوى غير آمن
        SafetyService-->>WebApp: إعادة خريطة النتائج<br/>{isSafe: "false", safetyResult: التفاصيل}
        WebApp-->>User: عرض تحذير الأمان<br/>(بدون حساب)
    end
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**تنويه**:
تمت ترجمة هذا المستند باستخدام خدمة الترجمة بالذكاء الاصطناعي [Co-op Translator](https://github.com/Azure/co-op-translator). بينما نسعى للدقة، يرجى العلم أن الترجمات الآلية قد تحتوي على أخطاء أو عدم دقة. يجب اعتبار المستند الأصلي بلغته الأصلية المصدر الرسمي والمعتمد. للمعلومات الهامة، يُنصح بالاستعانة بترجمة بشرية محترفة. نحن غير مسؤولين عن أي سوء فهم أو تفسير ناتج عن استخدام هذه الترجمة.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->