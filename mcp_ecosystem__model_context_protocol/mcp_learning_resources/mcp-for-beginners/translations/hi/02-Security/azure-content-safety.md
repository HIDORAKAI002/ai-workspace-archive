# Azure Content Safety के साथ उन्नत MCP सुरक्षा

> **OWASP MCP जोखिम जो संबोधित किया गया है**: [MCP06 - संदर्भ payload के माध्यम से प्रॉम्प्ट इंजेक्शन](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety कई शक्तिशाली उपकरण प्रदान करता है जो आपके MCP इंप्लीमेंटेशन की सुरक्षा को बढ़ा सकते हैं। अभ्यासात्मक कार्यान्वयन अनुभव के लिए, देखें [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) कैम्प 3: I/O सुरक्षा।

## प्रॉम्प्ट शील्ड

Microsoft के AI प्रॉम्प्ट शील्ड सीधे और अप्रत्यक्ष प्रॉम्प्ट इंजेक्शन हमलों के खिलाफ मजबूत सुरक्षा प्रदान करते हैं:

1. **उन्नत पहचान**: सामग्री में निहित दुर्भावनापूर्ण निर्देशों की पहचान के लिए मशीन लर्निंग का उपयोग करता है।
2. **स्पॉटलाइटिंग**: AI सिस्टम को मान्य निर्देश और बाहरी इनपुट के बीच अंतर करने में मदद के लिए इनपुट टेक्स्ट को रूपांतरित करता है।
3. **डेलीमीटर और डेटा मार्किंग**: भरोसेमंद और अविश्वसनीय डेटा के बीच सीमाएँ चिह्नित करता है।
4. **कंटेंट सेफ्टी इंटीग्रेशन**: Azure AI कंटेंट सेफ्टी के साथ मिलकर जेलब्रेक प्रयासों और हानिकारक सामग्री का पता लगाता है।
5. **निरंतर अपडेट्स**: Microsoft उभरते खतरों के खिलाफ सुरक्षा तंत्र को नियमित रूप से अपडेट करता है।

## MCP के साथ Azure Content Safety को लागू करना

यह तरीका बहु-स्तरीय सुरक्षा प्रदान करता है:
- प्रक्रिया से पहले इनपुट की स्कैनिंग
- परिणामों को लौटाने से पहले उनकी जांच
- ज्ञात हानिकारक पैटर्न के लिए ब्लॉकलिस्ट का उपयोग
- Azure के लगातार अपडेट होने वाले कंटेंट सेफ्टी मॉडल का लाभ उठाना

## Azure Content Safety संसाधन

अपने MCP सर्वर के साथ Azure Content Safety को लागू करने के बारे में अधिक जानने के लिए, इन आधिकारिक संसाधनों से परामर्श करें:

1. [Azure AI Content Safety Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/) - Azure Content Safety के लिए आधिकारिक दस्तावेज़।
2. [Prompt Shield Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - प्रॉम्प्ट इंजेक्शन हमलों को रोकने के बारे में जानें।
3. [Content Safety API Reference](https://learn.microsoft.com/rest/api/contentsafety/) - कंटेंट सेफ्टी को लागू करने के लिए विस्तृत API संदर्भ।
4. [Quickstart: Azure Content Safety with C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - C# का उपयोग करके त्वरित कार्यान्वयन मार्गदर्शिका।
5. [Content Safety Client Libraries](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - विभिन्न प्रोग्रामिंग भाषाओं के लिए क्लाइंट लाइब्रेरी।
6. [Detecting Jailbreak Attempts](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - जेलब्रेक प्रयासों का पता लगाने और रोकने के लिए विशिष्ट मार्गदर्शन।
7. [Best Practices for Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - कंटेंट सेफ्टी को प्रभावी ढंग से लागू करने के लिए सर्वोत्तम प्रथाएँ।

अधिक गहराई से कार्यान्वयन के लिए, देखें हमारा [Azure Content Safety Implementation guide](./azure-content-safety-implementation.md)।

## आगे क्या है

- पढ़ें: [Azure Content Safety Implementation](./azure-content-safety-implementation.md)
- वापस जाएं: [Security Module Overview](./README.md)
- आगे बढ़ें: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
यह दस्तावेज़ AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) का उपयोग करके अनुवादित किया गया है। हम सटीकता के लिए प्रयासरत हैं, लेकिन कृपया ध्यान दें कि स्वचालित अनुवादों में त्रुटियाँ या असंगतियॉं हो सकती हैं। मूल दस्तावेज़ को उसकी मूल भाषा में अधिकृत स्रोत माना जाना चाहिए। महत्वपूर्ण जानकारी के लिए पेशेवर मानव अनुवाद की सिफारिश की जाती है। इस अनुवाद के उपयोग से होने वाली किसी भी गलतफहमी या गलती के लिए हम जिम्मेदार नहीं हैं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->