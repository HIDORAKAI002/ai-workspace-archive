# 🚀 Module 1: Microsoft Foundry Toolkit का आधारभूत कुरा

[![Duration](https://img.shields.io/badge/Duration-15%20minutes-blue.svg)]()
[![Difficulty](https://img.shields.io/badge/Difficulty-Beginner-green.svg)]()
[![Prerequisites](https://img.shields.io/badge/Prerequisites-VS%20Code-orange.svg)]()

## 📋 सिकाइका उद्देश्यहरू

यस मोड्युलको अन्त्यसम्म, तपाईं सक्षम हुनुहुनेछ:
- ✅ Microsoft Foundry Toolkit Extension लाई VS Code को लागि इन्स्टल र कन्फिगर गर्ने
- ✅ Model Catalog मा नेभिगेट गर्ने र विभिन्न मोडेल स्रोतहरू बुझ्ने
- ✅ मोडेल परीक्षण र प्रयोगका लागि Playground प्रयोग गर्ने
- ✅ Agent Builder प्रयोग गरी अनुकूल AI एजेन्टहरू सिर्जना गर्ने
- ✅ विभिन्न प्रदायकहरूका मोडेल प्रदर्शन तुलना गर्ने
- ✅ प्राम्प्ट इन्जिनियरिङको सर्वोत्तम अभ्यासहरू लागू गर्ने

## 🧠 Microsoft Foundry Toolkit परिचय

**Microsoft Foundry Toolkit Extension for VS Code** माइक्रोसफ्टको प्रमुख एक्सटेन्शन हो जसले VS Code लाई व्यापक AI विकास वातावरणमा परिणत गर्छ। यसले AI अनुसन्धान र व्यावहारिक अनुप्रयोग विकास बीचको खाडल कम गर्छ, जसले सबै स्तरका विकासकर्ताहरूलाई जनरेटिभ AI पहुँचयोग्य बनाउँछ।

### 🌟 मुख्य क्षमता

| सुविधा | विवरण | प्रयोग केस |
|---------|-------------|----------|
| **🗂️ Model Catalog** | GitHub, ONNX, OpenAI, Anthropic, Google बाट १००+ मोडेलहरू पहुँच | मोडेल खोजी र चयन |
| **🔌 BYOM Support** | आफ्नै मोडेलहरू (स्थानीय/रिमोट) एकीकृत गर्नुहोस् | अनुकूल मोडेल तैनाथीकरण |
| **🎮 Interactive Playground** | च्याट इन्टरफेससहित वास्तविक-समय मोडेल परीक्षण | छिटो नमूना निर्माण र परीक्षण |
| **📎 Multi-Modal Support** | पाठ, चित्र, र संलग्नकहरू व्यवस्थापन गर्नुहोस् | जटिल AI अनुप्रयोगहरू |
| **⚡ Batch Processing** | धेरै प्राम्प्टहरू एकै पटक चलाउनुहोस् | प्रभावकारी परीक्षण कार्यप्रवाहहरू |
| **📊 Model Evaluation** | निर्मित मेट्रिक्स (F1, सान्दर्भिकता, समानता, सुसंगतता) | प्रदर्शन मूल्याङ्कन |

### 🎯 किन Microsoft Foundry Toolkit महत्वपूर्ण छ

- **🚀 द्रुत विकास**: विचारबाट नमूना निर्माणसम्म केही मिनेटमा
- **🔄 एकीकृत कार्यप्रवाह**: विभिन्न AI प्रदायकहरूको लागि एउटै इन्टरफेस
- **🧪 सजिलो प्रयोग**: जटिल सेटअप बिना मोडेलहरू तुलना गर्ने
- **📈 उत्पादन तयार**: नमूना निर्माणदेखि तैनाथीकरणसम्म सहज संक्रमण

## 🛠️ पूर्व आवश्यकताहरू र सेटअप

### 📦 Microsoft Foundry Toolkit Extension इन्स्टल गर्नुहोस्

**चरण 1: एक्सटेन्शन मार्केटप्लेसमा पहुँच**
1. Visual Studio Code खोल्नुहोस्
2. Extensions दृश्यमा जानुहोस् (`Ctrl+Shift+X` वा `Cmd+Shift+X`)
3. "Microsoft Foundry Toolkit" खोज्नुहोस्

**चरण 2: आफ्नो भर्सन छनौट गर्नुहोस्**
- **🟢 रिलीज**: उत्पादन प्रयोगका लागि सिफारिस गरिएको
- **🔶 प्रि-रिलीज**: अत्याधुनिक सुविधाहरूको पूर्व पहुँच

**चरण 3: इन्स्टल र सक्रिय पार्नुहोस्**

![Microsoft Foundry Toolkit Extension](../../../../translated_images/ne/aitkext.d28945a03eed003c.webp)

### ✅ सत्यापन चेकलिष्ट
- [ ] Microsoft Foundry Toolkit आइकन VS Code साइडबारमा देखा पर्छ
- [ ] एक्सटेन्शन सक्षम र सक्रिय छ
- [ ] आउटपुट प्यानलमा कुनै पनि इन्स्टलेशन त्रुटिहरू छैनन्

## 🧪 व्यावहारिक अभ्यास १: GitHub मोडेलहरू अन्वेषण गर्दै

**🎯 उद्देश्य**: Model Catalog मा पारंगत हुनुहोस् र आफ्नो पहिलो AI मोडेल परीक्षण गर्नुहोस्

### 📊 चरण १: Model Catalog मा नेभिगेट गर्नुहोस्

Model Catalog तपाईंको AI पारिस्थितिकी तंत्र प्रवेशद्वार हो। यो विभिन्न प्रदायकहरूका मोडेलहरू सङ्कलन गर्छ, जसले विकल्पहरू सजिलै खोज्न र तुलना गर्न मद्दत गर्दछ।

**🔍 नेभिगेसन मार्गदर्शन:**

Microsoft Foundry Toolkit साइडबारमा **MODELS - Catalog** मा क्लिक गर्नुहोस्

![Model Catalog](../../../../translated_images/ne/aimodel.263ed2be013d8fb0.webp)

**💡 प्रो टिप**: तपाईंको प्रयोग केससँग मेल खाने विशिष्ट क्षमता भएका मोडेलहरू खोज्नुहोस् (जस्तै, कोड उत्पादन, सिर्जनात्मक लेखन, विश्लेषण)।

**⚠️ नोट**: GitHub-होस्ट गरिएका मोडेलहरू (जस्तै GitHub मोडेलहरू) उपयोग गर्न निःशुल्क छन् तर अनुरोध र टोकनमा दर सिमा लागु हुन्छ। यदि तपाईंले गैर-GitHub मोडेलहरू (जस्तो कि Azure AI वा अन्य इन्डपोइन्टहरूबाट होस्ट गरिएका बाह्य मोडेलहरू) पहुँच गर्न चाहनुहुन्छ भने, उपयुक्त API कुञ्जी वा प्रमाणीकरण उपलब्ध गराउनु पर्नेछ।

### 🚀 चरण २: आफ्नो पहिलो मोडेल थप्नुहोस् र कन्फिगर गर्नुहोस्

**मोडेल छनौट रणनीति:**
- **GPT-4.1**: जटिल तर्क र विश्लेषणका लागि उत्तम
- **Phi-4-mini**: हल्का, छिटो प्रतिक्रिया दिने सरल कार्यहरूका लागि

**🔧 कन्फिगरेसन प्रक्रिया:**
1. क्याटलगबाट **OpenAI GPT-4.1** चयन गर्नुहोस्
2. **Add to My Models** मा क्लिक गर्नुहोस् - यसले प्रयोगका लागि मोडेल दर्ता गर्छ
3. परीक्षण वातावरण खोल्न **Try in Playground** चयन गर्नुहोस्
4. मोडेल सुरुवातको लागि प्रतीक्षा गर्नुहोस् (पहिलो पटक सेटअपमा केही समय लाग्न सक्छ)

![Playground Setup](../../../../translated_images/ne/playground.dd6f5141344878ca.webp)

**⚙️ मोडेल प्यारामिटरहरू बुझ्दै:**
- **Temperature**: सिर्जनात्मकता नियन्त्रण गर्छ (0 = निश्चित, 1 = सिर्जनात्मक)
- **Max Tokens**: अधिकतम प्रतिक्रिया लम्बाइ
- **Top-p**: प्रतिक्रिया विविधताको लागि न्यूक्लियस स्याम्पलिङ

### 🎯 चरण ३: Playground इन्टरफेसमा पारंगत हुनुहोस्

Playground तपाईंको AI प्रयोगशाला हो। यसको पूर्ण उपयोग कसरी गर्ने भन्ने कुरा यहाँ छ:

**🎨 Prompt Engineering का सर्वोत्तम अभ्यासहरू:**
1. **विशेष हुनुहोस्**: स्पष्ट र विस्तृत निर्देशनहरूले राम्रो परिणाम ल्याउँछन्
2. **सन्दर्भ प्रदान गर्नुहोस्**: सान्दर्भिक पृष्ठभूमि जानकारी समावेश गर्नुहोस्
3. **उदाहरणहरू प्रयोग गर्नुहोस्**: मोडेललाई तपाईं के चाहनुहुन्छ भनेर उदाहरणसँग देखाउनुहोस्
4. **पुनरावृत्ति गर्नुहोस्**: सुरुवाती परिणामहरूका आधारमा प्राम्प्टहरू सुधार्नुहोस्

**🧪 परीक्षण परिदृश्यहरू:**
```markdown
# Example 1: Code Generation
"Write a Python function that calculates the factorial of a number using recursion. Include error handling and docstrings."

# Example 2: Creative Writing
"Write a professional email to a client explaining a project delay, maintaining a positive tone while being transparent about challenges."

# Example 3: Data Analysis
"Analyze this sales data and provide insights: [paste your data]. Focus on trends, anomalies, and actionable recommendations."
```

![Testing Results](../../../../translated_images/ne/result.1dfcf211fb359cf6.webp)

### 🏆 चुनौती अभ्यास: मोडेल प्रदर्शन तुलना

**🎯 लक्ष्य**: एउटै प्राम्प्ट प्रयोग गरी विभिन्न मोडेलहरू तुलना गरेर तिनीहरूको क्षमताहरू बुझ्ने

**📋 निर्देशनहरू:**
1. आफ्नो कार्यक्षेत्रमा **Phi-4-mini** थप्नुहोस्
2. GPT-4.1 र Phi-4-mini दुवैमा एउटै प्राम्प्ट प्रयोग गर्नुहोस्

![set](../../../../translated_images/ne/set.88132df189ecde2c.webp)

3. प्रतिक्रिया गुणस्तर, गति, र शुद्धता तुलना गर्नुहोस्
4. नतिजा अनुभागमा आफ्नो पत्ता लगाइहरू दस्तावेज गर्नुहोस्

![Model Comparison](../../../../translated_images/ne/compare.97746cd0f9074955.webp)

**💡 पत्ता लगाउने मुख्य दृष्टिकोणहरू:**
- कहिले LLM र कहिले SLM प्रयोग गर्ने
- लागत र प्रदर्शन सन्तुलन
- विभिन्न मोडेलहरूको विशिष्ट क्षमता

## 🤖 व्यावहारिक अभ्यास २: Agent Builder द्वारा अनुकूल एजेन्टहरू बनाउने

**🎯 उद्देश्य**: विशिष्ट कार्यहरू र कार्यप्रवाहहरूका लागि अनुकूल AI एजेन्टहरू सिर्जना गर्नुहोस्

### 🏗️ चरण १: Agent Builder बुझ्नुहोस्

Agent Builder त्यहाँ हो जहाँ Microsoft Foundry Toolkit साँच्चिकै चम्किन्छ। यसले तपाईलाई ठूलो भाषा मोडेलको शक्ति अनुकूल निर्देशन, विशिष्ट प्यारामिटरहरू, र विशेषज्ञ ज्ञानसँग जोडिएको प्रयोजन-निर्मित AI सहायकहरू सिर्जना गर्न अनुमति दिन्छ।

**🧠 एजेन्ट संरचना कम्पोनेन्टहरू:**
- **कोर मोडेल**: आधारभूत LLM (GPT-4, Groks, Phi, आदि)
- **प्रणाली प्राम्प्ट**: एजेन्ट व्यक्तित्व र व्यवहार परिभाषित गर्छ
- **प्यारामिटरहरू**: उत्कृष्ट प्रदर्शनका लागि सूक्ष्म सेटिङहरू
- **उपकरण एकीकरण**: बाह्य API र MCP सेवासँग जडान
- **मेमोरी**: संवाद सन्दर्भ र सत्र स्थायित्व

![Agent Builder Interface](../../../../translated_images/ne/agentbuilder.25895b2d2f8c02e7.webp)

### ⚙️ चरण २: एजेन्ट कन्फिगरेसनमा गहिराइमा जानुहोस्

**🎨 प्रभावकारी प्रणाली प्राम्प्ट सिर्जना गर्दै:**
```markdown
# Template Structure:
## Role Definition
You are a [specific role] with expertise in [domain].

## Capabilities
- List specific abilities
- Define scope of knowledge
- Clarify limitations

## Behavior Guidelines
- Response style (formal, casual, technical)
- Output format preferences
- Error handling approach

## Examples
Provide 2-3 examples of ideal interactions
```

*अवश्य पनि, तपाईं Generate System Prompt प्रयोग गरेर AI बाट प्राम्प्टहरू बनाउन र अनुकूल गर्न सहयोग लिन सक्नुहुन्छ*

**🔧 प्यारामिटर अनुकूलन:**
| प्यारामिटर | सिफारिस गरिएको दायरा | प्रयोग केस |
|-----------|-----------------------|----------|
| **Temperature** | 0.1-0.3 | प्राविधिक/तथ्यात्मक प्रतिक्रिया |
| **Temperature** | 0.7-0.9 | सिर्जनात्मक/विचार विमर्श कार्यहरू |
| **Max Tokens** | ५००-१००० | संक्षिप्त प्रतिक्रिया |
| **Max Tokens** | २०००-४००० | विस्तृत व्याख्या |

### 🐍 चरण ३: व्यावहारिक अभ्यास - Python प्रोग्रामिङ एजेन्ट

**🎯 मिशन**: विशेष Python कोडिङ सहायक सिर्जना गर्नुहोस्

**📋 कन्फिगरेसन चरणहरू:**

1. **मोडेल छनौट**: **Claude 3.5 Sonnet** छान्नुहोस् (कोडका लागि उत्कृष्ट)

2. **प्रणाली प्राम्प्ट डिजाइन**:
```markdown
# Python Programming Expert Agent

## Role
You are a senior Python developer with 10+ years of experience. You excel at writing clean, efficient, and well-documented Python code.

## Capabilities
- Write production-ready Python code
- Debug complex issues
- Explain code concepts clearly
- Suggest best practices and optimizations
- Provide complete working examples

## Response Format
- Always include docstrings
- Add inline comments for complex logic
- Suggest testing approaches
- Mention relevant libraries when applicable

## Code Quality Standards
- Follow PEP 8 style guidelines
- Use type hints where appropriate
- Handle exceptions gracefully
- Write readable, maintainable code
```

3. **प्यारामिटर कन्फिगरेसन**:
   - Temperature: 0.2 (निश्चित, विश्वसनीय कोडका लागि)
   - Max Tokens: 2000 (विस्तृत व्याख्या)
   - Top-p: 0.9 (सन्तुलित सिर्जनशीलता)

![Python Agent Configuration](../../../../translated_images/ne/pythonagent.5e51b406401c165f.webp)

### 🧪 चरण ४: आफ्नो Python एजेन्ट परीक्षण गर्नुहोस्

**परीक्षण परिदृश्यहरू:**
1. **आधारभूत कार्य**: "प्राइम नम्बरहरू खोज्ने कार्य सिर्जना गर्नुहोस्"
2. **जटिल एल्गोरिदम**: "इनसर्ट, डिलिट, र सर्च विधिहरू सहितको बाइनरी सर्च ट्री कार्यान्वयन गर्नुहोस्"
3. **वास्तविक-विश्व समस्या**: "रेट लिमिटिङ र पुनः प्रयास व्यवस्थापन गर्ने वेब स्क्रेपर बनाउनुहोस्"
4. **डिबगिङ**: "यो कोड ठीक पार्नुहोस् [गलत कोड पेस्ट गर्नुहोस्]"

**🏆 सफलता मापदण्ड:**
- ✅ कोड त्रुटि बिना चल्छ
- ✅ उचित दस्तावेजिकरण समावेश गर्दछ
- ✅ Python का सर्वोत्तम अभ्यासहरू पालना गर्दछ
- ✅ स्पष्ट व्याख्या प्रदान गर्दछ
- ✅ सुधारका सुझाव दिन्छ

## 🎓 Module 1 समापन र आगामी चरणहरू

### 📊 ज्ञान जाँच

तपाईंको बुझाइ परीक्षण गर्नुहोस्:
- [ ] के तपाईं क्याटलगमा मोडेलहरूबीचको भिन्नता व्याख्या गर्न सक्नुहुन्छ?
- [ ] के तपाईंले सफलतापूर्वक अनुकूल एजेन्ट सिर्जना र परीक्षण गर्नुभयो?
- [ ] के तपाईं विभिन्न प्रयोग केसहरूका लागि प्यारामिटरहरू कसरी अनुकूल गर्ने बुझ्नुहुन्छ?
- [ ] के तपाईं प्रभावकारी प्रणाली प्राम्प्टहरू डिजाइन गर्न सक्नुहुन्छ?

### 📚 अतिरिक्त स्रोतहरू

- **Microsoft Foundry Toolkit कागजातहरू**: [अधिकृत Microsoft Docs](https://github.com/microsoft/vscode-ai-toolkit)
- **प्राम्प्ट इन्जिनियरिङ गाइड**: [सर्वोत्तम अभ्यासहरू](https://platform.openai.com/docs/guides/prompt-engineering)
- **Microsoft Foundry Toolkit मा मोडेलहरू**: [विकासमा मोडेलहरू](https://github.com/microsoft/vscode-ai-toolkit/blob/main/doc/models.md)

**🎉 बधाई छ!** तपाईंले Microsoft Foundry Toolkit का आधारभूत कुरा महारत हासिल गर्नुभयो र अझ उन्नत AI अनुप्रयोगहरू निर्माण गर्न तयार हुनुहुन्छ!

### 🔜 अर्को मोड्युलमा जानुहोस्

अझ उन्नत क्षमता सिक्न तयार हुनुहुन्छ? **[Module 2: MCP with Microsoft Foundry Toolkit Fundamentals](../lab2/README.md)** मा जानुहोस् जहाँ तपाईंले सिक्नुहुनेछ:
- आफ्नो एजेन्टहरूलाई Model Context Protocol (MCP) प्रयोग गरी बाह्य उपकरणहरूसँग कसरी जडान गर्ने
- Playwright प्रयोग गरी ब्राउजर अटोमेसन एजेन्टहरू कसरी बनाउने
- MCP सर्भरहरूलाई Microsoft Foundry Toolkit एजेन्टहरूसँग कसरी एकीकृत गर्ने
- बाह्य डेटा र क्षमताहरूले एजेन्टहरूलाई कसरी सुपरचार्ज गर्ने

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
यो दस्तावेज़ AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) प्रयोग गरेर अनुवाद गरिएको हो। हामी सही हुन प्रयास गर्छौं, तर कृपया जानकार हुनुस् कि स्वचालित अनुवादमा त्रुटिहरू वा अशुद्धताहरू हुन सक्छन्। मूल दस्तावेज़ यसको मूल भाषामा आधिकारिक स्रोत मानिनुपर्छ। महत्वपूर्ण जानकारीका लागि व्यावसायिक मानव अनुवाद सिफारिस गरिन्छ। यस अनुवादको प्रयोगबाट उत्पन्न कुनै पनि गलत बुझाइ वा त्रुटिको लागि हामी जिम्मेवार छैनौं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->