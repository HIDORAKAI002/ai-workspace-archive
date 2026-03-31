# नमुना चालवा

## आभासी पर्यावरण तयार करा

```sh
python -m venv venv
source ./venv/bin/activate
```

## अवलंबित्वे स्थापित करा

```sh
pip install "mcp[cli]"
```

## सर्व्हर चालवा

```sh
uvicorn server:app --port 8000
```

## GitHub Copilot आणि VS Code सह सर्व्हरची चाचणी करा

mcp.json मध्ये नोंद अशी जोडा:

```json
"servers": {
    "my-mcp-server-999e9ea3": {
        "url": "http://localhost:8001/sse",
        "type": "http"
    }
}
```

सुनिश्चित करा की तुम्ही सर्व्हरवर "start" क्लिक केले आहे.

GitHub Copilot मध्ये खालील प्रॉम्प्ट पेस्ट करा:

```text
create a blog post named "Where Python comes from", the content is "Python is actually named after Monty Python Flying Circus"
```

पहिल्यांदा तुम्हाला Sampling क्रिया स्वीकारायची आहे का हे विचारले जाईल, त्यानंतर तुम्हाला "create_blog" चालवण्यासाठी साधन स्वीकारायचे का हे विचारले जाईल. तुम्हाला खालीलप्रमाणे प्रतिसाद दिसेल:

```json
{
  "result": "{\"id\": \"Where Python comes from\", \"abstract\": \"# Python's Origin\\n\\nPython, the popular programming language, derives its name from **Monty Python's Flying Circus**, the British comedy troupe, rather than the snake. This naming choice reflects the creator's desire to make programming more fun and accessible.\"}"
}
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
हा दस्तऐवज AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) वापरून अनुवादित केला आहे. आम्ही अचूकतेसाठी प्रयत्नशील असलो तरी, कृपया लक्षात घ्या की स्वयंचलित अनुवादांमध्ये चुका किंवा अचूकतेच्या समस्यांचा समावेश असू शकतो. मूळ दस्तऐवज त्याच्या स्थानिक भाषेत अधिकृत स्रोत मानला जावा. महत्त्वपूर्ण माहितीसाठी व्यावसायिक मानवी अनुवादाची शिफारस केली जाते. या अनुवादाच्या वापरामुळे उद्भवलेल्या कोणत्याही गैरसमज किंवा चुकीच्या अर्थलागीसाठी आम्ही जबाबदार नाही.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->