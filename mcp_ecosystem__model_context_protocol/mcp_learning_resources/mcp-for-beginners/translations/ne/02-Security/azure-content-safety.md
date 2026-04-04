# Azure सामग्री सुरक्षा संग उन्नत MCP सुरक्षा

> **OWASP MCP जोखिम सम्बोधन**: [MCP06 - प्रॉम्प्ट इन्जेक्शन भिया सन्दर्भ पेलोडहरू](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure सामग्री सुरक्षा ले तपाईंको MCP कार्यान्वयनहरूको सुरक्षामा सुधार गर्न सक्ने धेरै शक्तिशाली उपकरणहरू प्रदान गर्दछ। व्यावहारिक कार्यान्वयन अनुभवको लागि, [MCP सुरक्षा सम्मेलन कार्यशाला (शेरपा)](https://azure-samples.github.io/sherpa/) क्याम्प 3: I/O सुरक्षा हेर्नुहोस्।

## प्रॉम्प्ट ढालहरू

Microsoft को AI प्रॉम्प्ट ढालहरूले सिधा र अप्रत्यक्ष प्रॉम्प्ट इन्जेक्शन आक्रमणहरू विरुद्ध निम्नमार्फत मजबूत सुरक्षा प्रदान गर्दछ:

1. **उन्नत पत्ता लगाउने**: सामग्रीमा रहेको दुष्ट निर्देशनहरू पहिचान गर्न मेसिन शिक्षण प्रयोग गर्छ।
2. **स्पटलाइटिंग**: AI प्रणालीहरूलाई मान्य निर्देशन र बाह्य इनपुट बीच भेद गर्न मद्दत पुर्‍याउन इनपुट टेक्स्ट रूपान्तरण गर्छ।
3. **डेलिमिटरहरू र डाटा मार्किंग**: भरपर्दो र अविश्वसनीय डाटा बीच सीमाना चिन्हित गर्छ।
4. **सामग्री सुरक्षा इन्ग्रेशन**: Azure AI सामग्री सुरक्षासँग काम गरेर जेलब्रेक प्रयासहरू र हानिकारक सामग्री पत्ता लगाउँछ।
5. **निरन्तर अपडेटहरू**: Microsoft नयाँ जोखिमहरू विरुद्ध सुरक्षा प्रणालीहरू नियमित रूपले अद्यावधिक गर्छ।

## MCP सँग Azure सामग्री सुरक्षा लागू गर्दै

यो दृष्टिकोण बहु-स्तरीय सुरक्षा प्रदान गर्दछ:
- प्रक्रिया अघि इनपुट स्क्यानिङ्ग
- फर्काउनु अघि आउटपुट प्रमाणिकरण
- ज्ञात हानिकारक ढाँचाहरूको लागि ब्लकलिस्ट प्रयोग
- Azure को निरन्तर अद्यावधिक सामग्री सुरक्षा मोडेलहरूको उपयोग

## Azure सामग्री सुरक्षा स्रोतहरू

तपाईंको MCP सर्भरहरूसँग Azure सामग्री सुरक्षा लागू गर्ने बारे थप जान्न, यी आधिकारिक स्रोतहरू परामर्श गर्नुहोस्:

1. [Azure AI Content Safety Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/) - Azure सामग्री सुरक्षाको आधिकारिक कागजात।
2. [Prompt Shield Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - प्रॉम्प्ट इन्जेक्शन आक्रमण रोकथामका लागि सिक्नुहोस्।
3. [Content Safety API Reference](https://learn.microsoft.com/rest/api/contentsafety/) - सामग्री सुरक्षा कार्यान्वयनका लागि विस्तृत API सन्दर्भ।
4. [Quickstart: Azure Content Safety with C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - C# प्रयोग गरेर छिटो कार्यान्वयन मार्गदर्शन।
5. [Content Safety Client Libraries](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - विभिन्न प्रोग्रामिङ भाषाहरूका लागि क्लाइन्ट पुस्तकालयहरू।
6. [Detecting Jailbreak Attempts](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - जेलब्रेक प्रयास पत्ता लगाउने र रोक्न विशिष्ट निर्देशन।
7. [Best Practices for Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - सामग्री सुरक्षा प्रभावकारी रूपमा कार्यान्वयन गर्न उत्कृष्ट अभ्यासहरू।

थप गहिरो कार्यान्वयनका लागि, हाम्रो [Azure Content Safety Implementation guide](./azure-content-safety-implementation.md) हेर्नुहोस्।

## के छ अगाडि

- पढ्नुहोस्: [Azure Content Safety Implementation](./azure-content-safety-implementation.md)
- फर्कनुहोस्: [Security Module Overview](./README.md)
- जारी राख्नुहोस्: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:  
यस दस्तावेजलाई AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) प्रयोग गरी अनुवाद गरिएको हो। हामी शुद्धताका लागि प्रयासरत भए तापनि, कृपया बुझ्नुहोस् कि स्वचालित अनुवादमा गलतिहरू वा अशुद्धता हुनसक्छ। मूल दस्तावेज यसको मूल भाषामा नै अधिकारिक स्रोत मानिनेछ। महत्वपूर्ण जानकारीका लागि व्यावसायिक मानव अनुवादको सिफारिस गरिन्छ। यस अनुवादको प्रयोगबाट उत्पन्न हुने कुनै पनि गलत बुझाइ वा व्याख्याका लागि हामी जिम्मेवार छैनौं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->