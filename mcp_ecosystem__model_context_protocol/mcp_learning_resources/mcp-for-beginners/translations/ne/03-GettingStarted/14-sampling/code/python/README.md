# नमूना चलाउनुहोस्

## भर्चुअल वातावरण सिर्जना गर्नुहोस्

```sh
python -m venv venv
source ./venv/bin/activate
```

## निर्भरताहरू स्थापना गर्नुहोस्

```sh
pip install "mcp[cli]"
```

## सर्भर चलाउनुहोस्

```sh
uvicorn server:app --port 8000
```

## GitHub Copilot र VS Code सँग सर्भर परीक्षण गर्नुहोस्

mcp.json मा निम्नानुसार इन्ट्री थप्नुहोस्:

```json
"servers": {
    "my-mcp-server-999e9ea3": {
        "url": "http://localhost:8001/sse",
        "type": "http"
    }
}
```

सुनिश्चित गर्नुहोस् कि तपाईंले सर्भरमा "start" क्लिक गर्नुभएको छ।

GitHub Copilot मा निम्न प्रॉम्प्ट पेस्ट गर्नुहोस्:

```text
create a blog post named "Where Python comes from", the content is "Python is actually named after Monty Python Flying Circus"
```

पहिलो पटक तपाईंजेल सोधिनेछ कि Sampling क्रिया स्वीकार गर्ने वा नगर्ने, त्यसपछि तपाईंजेल सोधिनेछ कि "create_blog" चलाउन उपकरण स्वीकार गर्ने वा नगर्ने। तपाईं यस प्रकारको प्रतिक्रिया देख्नुहुनेछ:

```json
{
  "result": "{\"id\": \"Where Python comes from\", \"abstract\": \"# Python's Origin\\n\\nPython, the popular programming language, derives its name from **Monty Python's Flying Circus**, the British comedy troupe, rather than the snake. This naming choice reflects the creator's desire to make programming more fun and accessible.\"}"
}
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:  
यो दस्तावेज़ AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) प्रयोग गरेर अनुवाद गरिएको हो। हामी शुद्धताका लागि प्रयास गर्दछौं, तर कृपया ध्यान दिनुहोस् कि स्वचालित अनुवादहरूमा गल्ती वा अशुद्धिहरू हुनसक्छ। मूल दस्तावेज यसको मूल भाषामा अधिकारिक स्रोत मान्नुपर्छ। महत्त्वपूर्ण जानकारीको लागि व्यावसायिक मानवीय अनुवाद सिफारिस गरिन्छ। यस अनुवादको प्रयोगबाट उत्पन्न कुनै पनि गलतफहमी वा गलत व्याख्याका लागि हामी जिम्मेवार छैनौं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->