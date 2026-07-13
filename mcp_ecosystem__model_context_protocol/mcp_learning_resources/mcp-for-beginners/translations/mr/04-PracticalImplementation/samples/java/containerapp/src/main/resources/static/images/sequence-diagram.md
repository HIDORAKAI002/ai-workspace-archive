```mermaid
sequenceDiagram
    actor User
    participant WebApp as वेब अॅप<br/>(ContentSafetyController)
    participant SafetyService as सामग्री सुरक्षितता सेवा
    participant AzureAPI as Azure सामग्री सुरक्षितता API
    participant LangChain as LangChain4j
    participant McpClient as MCP क्लायंट
    participant McpServer as MCP गणक सर्व्हर<br/>(पोर्ट 8080)
    participant CalcService as गणक सेवा

    %% वापरकर्ता संवाद
    User->>WebApp: गणनेचा प्रॉम्प्ट लिहा
    WebApp->>WebApp: PromptRequest तयार करा

    %% सामग्री सुरक्षितता तपासणी
    WebApp->>SafetyService: processPrompt(prompt)
    SafetyService->>AzureAPI: analyzeText(prompt)
    AzureAPI-->>SafetyService: AnalyzeTextResult
    SafetyService->>SafetyService: तपासा की सामग्री सुरक्षित आहे का<br/>(सर्व वर्गांसाठी गंभीरता < 2)

    %% प्रक्रिया प्रवाह - सुरक्षित सामग्री
    alt सामग्री सुरक्षित आहे
        SafetyService->>LangChain: प्रॉम्प्ट Bot.chat() कडे पाठवा
        LangChain->>McpClient: प्रॉम्प्ट प्रक्रिया करा
        McpClient->>McpServer: SSE द्वारे योग्य गणक साधन कॉल करा
        McpServer->>CalcService: गणना करा<br/>(बेरीज, वजाबाकी, गुणाकार, इ.)
        CalcService-->>McpServer: गणनेचा परिणाम
        McpServer-->>McpClient: साधन कार्यवाही परिणाम
        McpClient-->>LangChain: साधन परिणाम
        LangChain-->>SafetyService: बॉट प्रतिसाद
        SafetyService-->>WebApp: निकाल नकाशा परत करा<br/>{isSafe: "true", botResponse: result, safetyResult: details}
        WebApp-->>User: गणनेचा परिणाम आणि सुरक्षितता माहिती दर्शवा
    else सामग्री सुरक्षित नाही
        SafetyService-->>WebApp: निकाल नकाशा परत करा<br/>{isSafe: "false", safetyResult: details}
        WebApp-->>User: सुरक्षितता इशारा दर्शवा<br/>(गणना न करता)
    end
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
हा दस्तऐवज AI भाषांतर सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) चा वापर करून अनुवादित केला आहे. जरी आम्ही अचूकतेसाठी प्रयत्न करतो, तरी कृपया लक्षात घ्या की स्वयंचलित भाषांतरांमध्ये त्रुटी किंवा अचूकतेची कमतरता असू शकते. मूळ दस्तऐवज त्याच्या मूळ भाषेत अधिकृत स्रोत मानला पाहिजे. महत्त्वाची माहिती असल्यास, व्यावसायिक मानवी भाषांतराची शिफारस केली जाते. या भाषांतराच्या वापरामुळे उद्भवणाऱ्या कोणत्याही गैरसमज किंवा चुकीच्या अर्थलावणीसाठी आम्ही जबाबदार नाही.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->