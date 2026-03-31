# اجرای نمونه

## ایجاد محیط مجازی

```sh
python -m venv venv
source ./venv/bin/activate
```

## نصب وابستگی‌ها

```sh
pip install "mcp[cli]"
```

## اجرای سرور

```sh
uvicorn server:app --port 8000
```

## تست سرور با GitHub Copilot و VS Code

ورودی را به صورت زیر به mcp.json اضافه کنید:

```json
"servers": {
    "my-mcp-server-999e9ea3": {
        "url": "http://localhost:8001/sse",
        "type": "http"
    }
}
```

مطمئن شوید که روی "start" در سرور کلیک می‌کنید.

در GitHub Copilot، پیام زیر را جای‌گذاری کنید:

```text
create a blog post named "Where Python comes from", the content is "Python is actually named after Monty Python Flying Circus"
```

بار اول از شما پرسیده می‌شود که آیا می‌خواهید عمل Sampling را بپذیرید، سپس از شما خواسته می‌شود که ابزار برای اجرای "create_blog" را بپذیرید. باید پاسخی مشابه موارد زیر مشاهده کنید:

```json
{
  "result": "{\"id\": \"Where Python comes from\", \"abstract\": \"# Python's Origin\\n\\nPython, the popular programming language, derives its name from **Monty Python's Flying Circus**, the British comedy troupe, rather than the snake. This naming choice reflects the creator's desire to make programming more fun and accessible.\"}"
}
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**سلب مسئولیت**:
این سند با استفاده از سرویس ترجمه هوش مصنوعی [Co-op Translator](https://github.com/Azure/co-op-translator) ترجمه شده است. در حالی که ما تلاش می‌کنیم دقت را تضمین کنیم، لطفاً توجه داشته باشید که ترجمه‌های خودکار ممکن است حاوی خطاها یا نواقصی باشند. سند اصلی به زبان بومی خود باید به عنوان منبع معتبر در نظر گرفته شود. برای اطلاعات حیاتی، توصیه می‌شود از ترجمه حرفه‌ای انسانی استفاده شود. ما مسئول هیچ گونه سوءتفاهم یا تفسیر نادرستی ناشی از استفاده از این ترجمه نیستیم.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->