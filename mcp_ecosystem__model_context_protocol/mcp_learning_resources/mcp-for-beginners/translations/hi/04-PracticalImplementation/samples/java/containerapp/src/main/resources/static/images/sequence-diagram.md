```mermaid
sequenceDiagram
    actor User
    participant WebApp as वेब ऐप<br/>(ContentSafetyController)
    participant SafetyService as सामग्री सुरक्षा सेवा
    participant AzureAPI as Azure सामग्री सुरक्षा API
    participant LangChain as LangChain4j
    participant McpClient as MCP क्लाइंट
    participant McpServer as MCP कैलकुलेटर सर्वर<br/>(पोर्ट 8080)
    participant CalcService as कैलकुलेटर सेवा

    %% उपयोगकर्ता इंटरैक्शन
    User->>WebApp: गणना प्रांप्ट दर्ज करें
    WebApp->>WebApp: PromptRequest बनाएँ

    %% सामग्री सुरक्षा जांच
    WebApp->>SafetyService: processPrompt(prompt)
    SafetyService->>AzureAPI: analyzeText(prompt)
    AzureAPI-->>SafetyService: AnalyzeTextResult
    SafetyService->>SafetyService: जांचें कि सामग्री सुरक्षित है<br/>(सभी श्रेणियों के लिए गंभीरता < 2)

    %% प्रसंस्करण प्रवाह - सुरक्षित सामग्री
    alt सामग्री सुरक्षित है
        SafetyService->>LangChain: प्रांप्ट को Bot.chat() को पास करें
        LangChain->>McpClient: प्रांप्ट प्रक्रिया करें
        McpClient->>McpServer: SSE के माध्यम से उपयुक्त कैलकुलेटर टूल कॉल करें
        McpServer->>CalcService: गणना निष्पादित करें<br/>(जोड़ें, घटाएं, गुणा करें, आदि)
        CalcService-->>McpServer: गणना परिणाम
        McpServer-->>McpClient: टूल निष्पादन परिणाम
        McpClient-->>LangChain: टूल परिणाम
        LangChain-->>SafetyService: बॉट प्रतिक्रिया
        SafetyService-->>WebApp: परिणाम मानचित्र लौटाएँ<br/>{isSafe: "true", botResponse: result, safetyResult: details}
        WebApp-->>User: गणना परिणाम और सुरक्षा जानकारी प्रदर्शित करें
    else सामग्री असुरक्षित है
        SafetyService-->>WebApp: परिणाम मानचित्र लौटाएँ<br/>{isSafe: "false", safetyResult: details}
        WebApp-->>User: सुरक्षा चेतावनी प्रदर्शित करें<br/>(गणना के बिना)
    end
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
इस दस्तावेज़ का अनुवाद AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) का उपयोग करके किया गया है। जबकि हम सटीकता के लिए प्रयास करते हैं, कृपया ध्यान दें कि स्वचालित अनुवादों में त्रुटियाँ या अशुद्धियाँ हो सकती हैं। मूल दस्तावेज़ अपनी मूल भाषा में ही प्रामाणिक स्रोत माना जाना चाहिए। महत्वपूर्ण जानकारी के लिए, पेशेवर मानव अनुवाद की सिफारिश की जाती है। इस अनुवाद के उपयोग से उत्पन्न किसी भी गलतफहमी या गलत व्याख्या के लिए हम उत्तरदायी नहीं हैं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->