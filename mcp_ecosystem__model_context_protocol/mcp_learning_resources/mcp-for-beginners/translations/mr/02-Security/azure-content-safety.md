# Azure Content Safety सह प्रगत MCP सुरक्षा

> **OWASP MCP जोखमीचे निराकरण**: [MCP06 - संदर्भ आधारित पेलोडद्वारे प्रॉम्प्ट इंजेक्शन](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety अनेक सामर्थ्यशाली साधने प्रदान करते जी तुमच्या MCP अंमलबजावणींची सुरक्षा वाढवू शकतात. प्रत्यक्ष अंमलबजावणीचा अनुभव घेण्यासाठी, पहा [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) कॅम्प 3: I/O सुरक्षा.

## प्रॉम्प्ट शील्ड्स

Microsoft चे AI प्रॉम्प्ट शील्ड्स थेट आणि अप्रत्यक्ष प्रॉम्प्ट इंजेक्शन हल्ल्यांपासून मजबूत संरक्षण प्रदान करतात:

1. **प्रगत शोध**: सामग्रीमध्ये एम्बेड केलेल्या दुष्टसूचना ओळखण्यासाठी मशीन लर्निंग वापरते.
2. **स्पॉटलाईटिंग**: इनपुट मजकूर बदलते ज्यामुळे AI प्रणाली वैध सूचना आणि बाह्य इनपुट्स यातील फरक करू शकते.
3. **डेलिमीटर्स आणि डेटामार्किंग**: विश्वासार्ह आणि अविश्वसनीय डेटामधील सीमा चिन्हांकित करते.
4. **कंटेंट सेफ्टी समाकलन**: Azure AI कंटेंट सेफ्टीसह काम करते जे जाइलब्रेक प्रयत्न आणि हानिकारक सामग्री शोधते.
5. **सतत अद्यतने**: Microsoft नियमितपणे नव्या धोकाांपासून संरक्षण यंत्रणा अपडेट करते.

## MCP सह Azure Content Safety ची अंमलबजावणी

हा दृष्टिकोन बहुस्तरीय संरक्षण प्रदान करतो:
- प्रक्रिया करण्यापूर्वी इनपुटची स्कॅनिंग करणे
- परत करताना आउटपुटची पडताळणी करणे
- ज्ञात हानिकारक नमुन्यांसाठी ब्लॉकलिस्ट वापरणे
- Azure च्या सतत अद्ययावत कंटेंट सेफ्टी मॉडेल्सचा लाभ घेणे

## Azure Content Safety संसाधने

तुमच्या MCP सर्व्हरमध्ये Azure Content Safety ची अंमलबजावणी करण्याबाबत अधिक जाणून घेण्यासाठी, या अधिकृत संसाधनांचा सल्ला घ्या:

1. [Azure AI Content Safety Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/) - Azure Content Safety साठी अधिकृत दस्तऐवज.
2. [Prompt Shield Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - प्रॉम्प्ट इंजेक्शन हल्ले प्रतिबंधित करण्याबाबत शिका.
3. [Content Safety API Reference](https://learn.microsoft.com/rest/api/contentsafety/) - कंटेंट सेफ्टीची अंमलबजावणी करण्यासाठी तपशीलवार API संदर्भ.
4. [Quickstart: Azure Content Safety with C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - C# वापरून जलद अंमलबजावणी मार्गदर्शक.
5. [Content Safety Client Libraries](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - विविध प्रोग्रामिंग भाषा साठी क्लायंट लायब्ररीज.
6. [Detecting Jailbreak Attempts](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - जाइलब्रेक प्रयत्न ओळखण्याबाबत विशिष्ट मार्गदर्शन.
7. [Best Practices for Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - प्रभावीपणे कंटेंट सेफ्टी अंमलबजावणीसाठी सर्वोत्तम पद्धती.

अधिक सखोल अंमलबजावणीसाठी, आमचा [Azure Content Safety Implementation guide](./azure-content-safety-implementation.md) पाहा.

## पुढे काय

- वाचा: [Azure Content Safety Implementation](./azure-content-safety-implementation.md)
- परत जा: [Security Module Overview](./README.md)
- पुढे जा: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
हा दस्तऐवज [Co-op Translator](https://github.com/Azure/co-op-translator) AI अनुवाद सेवेचा वापर करून अनुवादित केला आहे. आम्ही अचूकतेची काळजी घेत असलो तरी, कृपया लक्षात ठेवा की स्वयंचलित अनुवादांमध्ये चुका किंवा तफावत असू शकतात. मूळ दस्तऐवज त्याच्या स्थानिक भाषेत अधिकृत स्रोत मानला जावा. महत्त्वाची माहिती असल्यास, व्यावसायिक मानवी अनुवाद करणे शिफारसीय आहे. या अनुवादाचा वापर केल्यामुळे उद्भवलेल्या कोणत्याही गैरसमज किंवा चुकीच्या व्याख्येसाठी आम्ही जबाबदार नाही.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->