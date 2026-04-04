# नमूना चलाएँ

## वर्चुअल वातावरण बनाएं

```sh
python -m venv venv
source ./venv/bin/activate
```

## निर्भरताएँ स्थापित करें

```sh
pip install "mcp[cli]"
```

## सर्वर चलाएँ

```sh
uvicorn server:app --port 8000
```

## GitHub Copilot और VS Code के साथ सर्वर का परीक्षण करें

mcp.json में निम्नलिखित प्रविष्टि जोड़ें:

```json
"servers": {
    "my-mcp-server-999e9ea3": {
        "url": "http://localhost:8001/sse",
        "type": "http"
    }
}
```

सुनिश्चित करें कि आप सर्वर पर "start" क्लिक करें।

GitHub Copilot में निम्न प्रॉम्प्ट पेस्ट करें:

```text
create a blog post named "Where Python comes from", the content is "Python is actually named after Monty Python Flying Circus"
```

पहली बार आपसे Sampling क्रिया स्वीकार करने के लिए कहा जाएगा, फिर आपको उपकरण "create_blog" चलाने के लिए स्वीकार करने के लिए कहा जाएगा। आपको निम्नलिखित के समान प्रतिक्रिया दिखनी चाहिए:

```json
{
  "result": "{\"id\": \"Where Python comes from\", \"abstract\": \"# Python's Origin\\n\\nPython, the popular programming language, derives its name from **Monty Python's Flying Circus**, the British comedy troupe, rather than the snake. This naming choice reflects the creator's desire to make programming more fun and accessible.\"}"
}
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:  
इस दस्तावेज़ का अनुवाद एआई अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) का उपयोग करके किया गया है। यद्यपि हम सटीकता के लिए प्रयासरत हैं, कृपया ध्यान रखें कि स्वचालित अनुवाद में त्रुटियाँ या अशुद्धियाँ हो सकती हैं। मूल दस्तावेज़ अपनी मूल भाषा में ही प्राधिकृत स्रोत माना जाना चाहिए। महत्वपूर्ण जानकारी के लिए पेशेवर मानव अनुवाद की सलाह दी जाती है। इस अनुवाद के उपयोग से उत्पन्न किसी भी गलतफहमी या व्याख्या के लिए हम जिम्मेदार नहीं हैं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->