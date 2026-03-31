# নমুনাটি চালান

## ভার্চুয়াল পরিবেশ তৈরি করুন

```sh
python -m venv venv
source ./venv/bin/activate
```

## নির্ভরশীলতা ইনস্টল করুন

```sh
pip install "mcp[cli]"
```

## সার্ভার চালান

```sh
uvicorn server:app --port 8000
```

## GitHub Copilot এবং VS Code দিয়ে সার্ভারটি পরীক্ষা করুন

mcp.json এ এন্ট্রি যুক্ত করুন নিম্নরূপ:

```json
"servers": {
    "my-mcp-server-999e9ea3": {
        "url": "http://localhost:8001/sse",
        "type": "http"
    }
}
```

নিশ্চিত করুন যে আপনি সার্ভারে "start" ক্লিক করেছেন।

GitHub Copilot এ নিম্নলিখিত প্রম্পট পেস্ট করুন:

```text
create a blog post named "Where Python comes from", the content is "Python is actually named after Monty Python Flying Circus"
```

প্রথমবার আপনাকে Sampling action গ্রহণ করতে বলা হবে, তারপর আপনাকে "create_blog" চালানোর জন্য টুল গ্রহণ করতে বলা হবে। আপনি এমন একটি প্রতিক্রিয়া দেখতে পাবেন:

```json
{
  "result": "{\"id\": \"Where Python comes from\", \"abstract\": \"# Python's Origin\\n\\nPython, the popular programming language, derives its name from **Monty Python's Flying Circus**, the British comedy troupe, rather than the snake. This naming choice reflects the creator's desire to make programming more fun and accessible.\"}"
}
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**অস্বীকৃতি**:  
এই নথিটি AI অনুবাদ পরিষেবা [Co-op Translator](https://github.com/Azure/co-op-translator) ব্যবহার করে অনূদিত হয়েছে। আমরা সঠিকতার জন্য চেষ্টা করি, কিন্তু অনুগ্রহ করে বুঝবেন যে স্বয়ংক্রিয় অনুবাদে ভুল বা অসঙ্গতি থাকতে পারে। মূল নথিটি তার নিজ ভাষায় প্রামাণিক উৎস হিসেবে বিবেচিত হওয়া উচিত। গুরুত্বপূর্ণ তথ্যের জন্য পেশাদার মানব অনুবাদের পরামর্শ দেওয়া হয়। এই অনুবাদের ব্যবহারে কোনো বিভ্রান্তি বা ভুল ব্যাখ্যার জন্য আমরা দায়ী নই।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->