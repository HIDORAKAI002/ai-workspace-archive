```mermaid
sequenceDiagram
    actor User
    participant WebApp as वेब एप<br/>(ContentSafetyController)
    participant SafetyService as कन्टेन्ट सुरक्षा सेवा
    participant AzureAPI as Azure कन्टेन्ट सुरक्षा API
    participant LangChain as LangChain4j
    participant McpClient as MCP ग्राहक
    participant McpServer as MCP क्यालकुलेटर सर्भर<br/>(पोर्ट ८०८०)
    participant CalcService as क्यालकुलेटर सेवा

    %% प्रयोगकर्ता अन्तरक्रिया
    User->>WebApp: गणना संकेत प्रविष्ट गर्नुहोस्
    WebApp->>WebApp: PromptRequest सिर्जना गर्नुहोस्

    %% कन्टेन्ट सुरक्षा जाँच
    WebApp->>SafetyService: processPrompt(prompt)
    SafetyService->>AzureAPI: analyzeText(prompt)
    AzureAPI-->>SafetyService: AnalyzeTextResult
    SafetyService->>SafetyService: जाँच गर्नुहोस् कन्टेन्ट सुरक्षित छ कि छैन<br/>(स severity< २ सबै वर्गहरूका लागि)

    %% प्रशोधन प्रवाह - सुरक्षित कन्टेन्ट
    alt कन्टेन्ट सुरक्षित छ
        SafetyService->>LangChain: संकेत पास गर्नुहोस् Bot.chat() लाई
        LangChain->>McpClient: संकेत प्रशोधन गर्नुहोस्
        McpClient->>McpServer: उपयुक्त क्यालकुलेटर उपकरणलाई SSE मार्फत कल गर्नुहोस्
        McpServer->>CalcService: गणना कार्यान्वयन गर्नुहोस्<br/>(थप, घटाउनुहोस्, गुणा गर्नुहोस्, आदि)
        CalcService-->>McpServer: गणना परिणाम
        McpServer-->>McpClient: उपकरण कार्यान्वयन परिणाम
        McpClient-->>LangChain: उपकरण परिणाम
        LangChain-->>SafetyService: बोट प्रतिक्रिया
        SafetyService-->>WebApp: परिणाम नक्सा फर्काउनुहोस्<br/>{isSafe: "true", botResponse: परिणाम, safetyResult: विवरण}
        WebApp-->>User: गणना परिणाम र सुरक्षा जानकारी प्रदर्शन गर्नुहोस्
    else कन्टेन्ट असुरक्षित छ
        SafetyService-->>WebApp: परिणाम नक्सा फर्काउनुहोस्<br/>{isSafe: "false", safetyResult: विवरण}
        WebApp-->>User: सुरक्षा चेतावनी देखाउनुहोस्<br/>(गणना बिना)
    end
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
यो दस्तावेज़ AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) प्रयोग गरेर अनुवाद गरिएको हो। हामी सही हुन प्रयास गर्छौं, तर कृपया जानकार हुनुस् कि स्वचालित अनुवादमा त्रुटिहरू वा अशुद्धताहरू हुन सक्छन्। मूल दस्तावेज़ यसको मूल भाषामा आधिकारिक स्रोत मानिनुपर्छ। महत्वपूर्ण जानकारीका लागि व्यावसायिक मानव अनुवाद सिफारिस गरिन्छ। यस अनुवादको प्रयोगबाट उत्पन्न कुनै पनि गलत बुझाइ वा त्रुटिको लागि हामी जिम्मेवार छैनौं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->