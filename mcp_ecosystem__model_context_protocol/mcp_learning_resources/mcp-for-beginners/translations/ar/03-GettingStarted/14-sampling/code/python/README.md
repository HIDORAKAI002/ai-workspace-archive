# تشغيل العينة

## إنشاء بيئة افتراضية

```sh
python -m venv venv
source ./venv/bin/activate
```

## تثبيت التبعيات

```sh
pip install "mcp[cli]"
```

## تشغيل الخادم

```sh
uvicorn server:app --port 8000
```

## اختبار الخادم باستخدام GitHub Copilot و VS Code

أضف الإدخال إلى mcp.json كما يلي:

```json
"servers": {
    "my-mcp-server-999e9ea3": {
        "url": "http://localhost:8001/sse",
        "type": "http"
    }
}
```

تأكد من النقر على "start" على الخادم.

في GitHub Copilot الصق المطالبة التالية:

```text
create a blog post named "Where Python comes from", the content is "Python is actually named after Monty Python Flying Circus"
```

في المرة الأولى سيُطلب منك ما إذا كنت تقبل إجراء Sampling، ثم سيُطلب منك قبول تشغيل الأداة "create_blog". ينبغي أن ترى استجابة مشابهة لـ:

```json
{
  "result": "{\"id\": \"Where Python comes from\", \"abstract\": \"# Python's Origin\\n\\nPython, the popular programming language, derives its name from **Monty Python's Flying Circus**, the British comedy troupe, rather than the snake. This naming choice reflects the creator's desire to make programming more fun and accessible.\"}"
}
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**إخلاء مسؤولية**:  
تمت ترجمة هذا المستند باستخدام خدمة الترجمة الآلية [Co-op Translator](https://github.com/Azure/co-op-translator). بينما نسعى لتحقيق الدقة، يرجى العلم بأن الترجمات الآلية قد تحتوي على أخطاء أو عدم دقة. يجب اعتبار المستند الأصلي بلغته الأصلية المصدر الرسمي والمعتمد. للمعلومات الهامة، يُنصح باللجوء إلى ترجمة بشرية محترفة. نحن غير مسؤولين عن أي سوء فهم أو تفسير ناتج عن استخدام هذه الترجمة.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->