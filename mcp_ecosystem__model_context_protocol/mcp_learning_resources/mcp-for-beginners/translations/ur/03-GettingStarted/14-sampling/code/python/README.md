# نمونہ چلائیں

## ورچوئل ماحول بنائیں

```sh
python -m venv venv
source ./venv/bin/activate
```

## انحصارات انسٹال کریں

```sh
pip install "mcp[cli]"
```

## سرور چلائیں

```sh
uvicorn server:app --port 8000
```

## GitHub Copilot اور VS Code کے ساتھ سرور کی جانچ کریں

mcp.json میں درج ذیل اندراج شامل کریں:

```json
"servers": {
    "my-mcp-server-999e9ea3": {
        "url": "http://localhost:8001/sse",
        "type": "http"
    }
}
```

یقینی بنائیں کہ آپ سرور پر "start" پر کلک کریں۔

GitHub Copilot میں درج ذیل پرامپٹ چسپاں کریں:

```text
create a blog post named "Where Python comes from", the content is "Python is actually named after Monty Python Flying Circus"
```

پہلی بار آپ سے Sampling ایکشن قبول کرنے کے بارے میں پوچھا جائے گا، پھر آپ سے "create_blog" کو چلانے والے ٹول کو قبول کرنے کو کہا جائے گا۔ آپ کو اس جیسے جواب نظر آنا چاہیے:

```json
{
  "result": "{\"id\": \"Where Python comes from\", \"abstract\": \"# Python's Origin\\n\\nPython, the popular programming language, derives its name from **Monty Python's Flying Circus**, the British comedy troupe, rather than the snake. This naming choice reflects the creator's desire to make programming more fun and accessible.\"}"
}
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**اشارہ**:  
یہ دستاویز AI ترجمہ سروس [Co-op Translator](https://github.com/Azure/co-op-translator) کے ذریعے ترجمہ کی گئی ہے۔ اگرچہ ہم درستگی کے لیے کوشاں ہیں، براہ کرم آگاہ رہیں کہ خودکار تراجم میں غلطیاں یا عدم وضاحت ہو سکتی ہے۔ اصل دستاویز اپنی بنیادی زبان میں معتبر ماخذ سمجھی جانی چاہیے۔ اہم معلومات کے لیے پیشہ ور انسانی ترجمہ کرنے کی سفارش کی جاتی ہے۔ اس ترجمے کے استعمال سے پیدا ہونے والے کسی بھی غلط فہمی یا غلط تشریح کی ذمہ داری ہم پر نہیں ہوگی۔
<!-- CO-OP TRANSLATOR DISCLAIMER END -->