# Azure Content Safety को साथ उन्नत MCP सुरक्षा

> **OWASP MCP जोखिम सम्बोधन**: [MCP06 - उद्देश्य प्रवाह सबवरजन](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety ले तपाईंको MCP कार्यान्वयनको सुरक्षामा थप शक्ति प्रदान गर्ने केही शक्तिशाली उपकरणहरू प्रदान गर्दछ। व्यावहारिक कार्यान्वयन अनुभवको लागि, [MCP सुरक्षा सम्मेलन कार्यशाला (Sherpa)](https://azure-samples.github.io/sherpa/) क्याम्प 3: I/O सुरक्षा हेर्नुहोस्।

## प्रॉम्प्ट ढालहरू

Microsoft को AI प्रॉम्प्ट ढालले प्रत्यक्ष र अप्रत्यक्ष प्रॉम्प्ट इन्जेक्सन आक्रमणहरू विरुद्ध बलियो सुरक्षा प्रदान गर्दछ जसमा समावेश छन्:

1. **उन्नत पहिचान**: सामग्रीमा समावेश दुर्भावनापूर्ण निर्देशनहरू पहिचान गर्न मेसिन लर्निङ प्रयोग गर्दछ।
2. **स्पटलाइटिङ**: इनपुट पाठलाई रूपान्तरण गर्छ जसले AI प्रणालीहरूलाई मान्य निर्देशन र बाह्य इनपुटहरू बीच फरक गर्न मद्दत गर्दछ।
3. **डिलिमिटर्स र डाटामार्किङ**: विश्वसनीय र अविश्वसनीय डाटा बीच सिमाना चिन्ह लगाउँछ।
4. **कन्टेन्ट सेफ्टी इंटिग्रेसन**: Azure AI Content Safety सँग काम गरेर जेलब्रेक प्रयासहरू र हानिकारक सामग्री पहिचान गर्दछ।
5. **लगातार अपडेटहरू**: Microsoft नयाँ जोखिमहरू विरुद्ध सुरक्षा संयन्त्रहरू नियमित रूपमा अपडेट गर्दछ।

## Azure Content Safety को साथ MCP कार्यान्वयन

यो तरिकाले बहु-स्तरीय सुरक्षा प्रदान गर्दछ:
- प्रक्रिया अघि इनपुटहरू स्क्यान गर्ने
- फिर्ता पठाउनुअघि आउटपुटहरू मान्य गर्ने
- ज्ञात हानिकारक ढाँचाहरूको लागि ब्लकलिस्ट प्रयोग गर्ने
- Azure का निरन्तर अपडेट हुने कन्टेन्ट सेफ्टी मोडेलहरू प्रयोग गर्ने

## Azure Content Safety स्रोतहरू

Azure Content Safety लाई तपाईंको MCP सर्भरहरूसँग कसरी प्रयोग गर्ने जान्न यी आधिकारिक स्रोतहरू परामर्श गर्नुहोस्:

1. [Azure AI Content Safety Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/) - Azure Content Safety को आधिकारिक कागजात।
2. [Prompt Shield Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - प्रॉम्प्ट इन्जेक्सन आक्रमणहरू रोक्न सिक्नुहोस्।
3. [Content Safety API Reference](https://learn.microsoft.com/rest/api/contentsafety/) - Content Safety कार्यान्वयनका लागि विस्तृत API सन्दर्भ।
4. [Quickstart: Azure Content Safety with C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - C# प्रयोग गरेर त्वरित कार्यान्वयन मार्गनिर्देशन।
5. [Content Safety Client Libraries](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - विभिन्न प्रोग्रामिङ भाषाका लागि क्लाइन्ट लाइब्रेरीहरू।
6. [Detecting Jailbreak Attempts](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - जेलब्रेक प्रयासहरू थाहा पाउने र रोकथाम गर्ने विशेष मार्गदर्शन।
7. [Best Practices for Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - कन्टेन्ट सेफ्टी प्रभावकारी ढंगले कार्यान्वयन गर्नका लागि उत्तम अभ्यासहरू।

अझ विस्तृत कार्यान्वयनका लागि, हाम्रो [Azure Content Safety कार्यान्वयन मार्गदर्शन](./azure-content-safety-implementation.md) हेर्नुहोस्।

## के छ अर्को

- पढ्नुहोस्: [Azure Content Safety कार्यान्वयन](./azure-content-safety-implementation.md)
- फर्कनुहोस्: [सुरक्षा मोड्युल अवलोकन](./README.md)
- जारी राख्नुहोस्: [मोड्युल ३: सुरु गर्दै](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
यो दस्तावेज़ AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) प्रयोग गरेर अनुवाद गरिएको हो। हामी सही हुन प्रयास गर्छौं, तर कृपया जानकार हुनुस् कि स्वचालित अनुवादमा त्रुटिहरू वा अशुद्धताहरू हुन सक्छन्। मूल दस्तावेज़ यसको मूल भाषामा आधिकारिक स्रोत मानिनुपर्छ। महत्वपूर्ण जानकारीका लागि व्यावसायिक मानव अनुवाद सिफारिस गरिन्छ। यस अनुवादको प्रयोगबाट उत्पन्न कुनै पनि गलत बुझाइ वा त्रुटिको लागि हामी जिम्मेवार छैनौं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->