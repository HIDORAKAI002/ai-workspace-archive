# Azure Content Safety सह प्रगत MCP सुरक्षा

> **OWASP MCP धोक्याचा निराकरण**: [MCP06 - हेतू प्रवाह फसवणूक](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety अनेक सामर्थ्यशाली साधने प्रदान करते जी आपल्या MCP अमलबजावणींच्या सुरक्षिततेमध्ये सुधारणा करू शकतात. प्रत्यक्ष अमलबजावणीचा अनुभव घेण्यासाठी, पाहा [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O Security.

## प्रॉम्प्ट शिल्ड्स

Microsoft चे AI प्रॉम्प्ट शिल्ड्स थेट आणि अप्रत्यक्ष प्रॉम्प्ट इंजेक्शन हल्ल्यांपासून मजबूत संरक्षण प्रदान करतात:

1. **प्रगत शोध**: सामग्रीमध्ये लपविलेल्या दुष्टसूचनांना ओळखण्यासाठी मशीन लर्निंगचा वापर.
2. **स्पॉटलाईटिंग**: इनपुट मजकूर रूपांतरित करते ज्यामुळे AI प्रणालींना वैध सूचना आणि बाह्य इनपुट्स यामध्ये फरक पडतो.
3. **डिलिमीटर्स आणि डेटामार्किंग**: विश्वासार्ह आणि अविश्वसनीय डेटामध्ये सीमा चिन्हांकित करतो.
4. **कंटेंट सेफ्टी इंटिग्रेशन**: Azure AI Content Safety सह काम करून जेलब्रेक प्रयत्न आणि हानिकारक सामग्री शोधतो.
5. **सतत अद्यतने**: Microsoft सतत नव्या धोका विरुद्ध संरक्षण प्रक्रिया अद्यतनित करतो.

## MCP सह Azure Content Safety ची अंमलबजावणी

हे दृष्टिकोन बहुस्तरीय संरक्षण प्रदान करतो:
- प्रक्रिया करण्याआधी इनपुट स्कॅन करणे
- परत येण्याआधी आउटपुट वैधता तपासणे
- ज्ञात हानिकारक पॅटर्नसाठी ब्लॉकलिस्ट वापरणे
- Azure च्या सतत अद्यतनित कंटेंट सेफ्टी मॉडेल्सचा लाभ घेणे

## Azure Content Safety स्रोत

आपल्या MCP सर्व्हरमध्ये Azure Content Safety कसे अंमलात आणायचे याबाबत अधिक जाणून घेण्यासाठी, या अधिकृत स्रोतांचा सल्ला घ्या:

1. [Azure AI Content Safety दस्तऐवज](https://learn.microsoft.com/azure/ai-services/content-safety/) - Azure Content Safety साठी अधिकृत कागदपत्रे.
2. [प्रॉम्प्ट शिल्ड दस्तऐवज](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - प्रॉम्प्ट इंजेक्शन हल्ले कसे टाळायचे याबद्दल शिका.
3. [Content Safety API संदर्भ](https://learn.microsoft.com/rest/api/contentsafety/) - Content Safety अंमलबजावणीसाठी सविस्तर API संदर्भ.
4. [Quickstart: C# सह Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - C# वापरून जलद अंमलबजावणी मार्गदर्शक.
5. [Content Safety क्लायंट लायब्ररीज](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - विविध प्रोग्रामिंग भाषांसाठी क्लायंट लायब्ररीज.
6. [जेलब्रेक प्रयत्न शोधणे](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - जेलब्रेक प्रयत्न ओळखणे व टाळण्यासाठी विशिष्ट मार्गदर्शन.
7. [Content Safety साठी सर्वोत्तम पद्धती](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - प्रभावी कंटेंट सेफ्टी अंमलबजावणीसाठी सर्वोत्तम पद्धती.

अधिक सखोल अंमलबजावणीसाठी, आमच्या [Azure Content Safety Implementation guide](./azure-content-safety-implementation.md) पाहा.

## पुढे काय

- वाचा: [Azure Content Safety Implementation](./azure-content-safety-implementation.md)
- परत जा: [Security Module Overview](./README.md)
- पुढे जा: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
हा दस्तऐवज AI भाषांतर सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) चा वापर करून अनुवादित केला आहे. जरी आम्ही अचूकतेसाठी प्रयत्न करतो, तरी कृपया लक्षात घ्या की स्वयंचलित भाषांतरांमध्ये त्रुटी किंवा अचूकतेची कमतरता असू शकते. मूळ दस्तऐवज त्याच्या मूळ भाषेत अधिकृत स्रोत मानला पाहिजे. महत्त्वाची माहिती असल्यास, व्यावसायिक मानवी भाषांतराची शिफारस केली जाते. या भाषांतराच्या वापरामुळे उद्भवणाऱ्या कोणत्याही गैरसमज किंवा चुकीच्या अर्थलावणीसाठी आम्ही जबाबदार नाही.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->