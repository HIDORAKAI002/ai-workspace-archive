# 🚀 मॉड्यूल 1: Microsoft Foundry Toolkit के मूल बातें

[![Duration](https://img.shields.io/badge/Duration-15%20minutes-blue.svg)]()
[![Difficulty](https://img.shields.io/badge/Difficulty-Beginner-green.svg)]()
[![Prerequisites](https://img.shields.io/badge/Prerequisites-VS%20Code-orange.svg)]()

## 📋 सीखने के उद्देश्य

इस मॉड्यूल के अंत तक, आप सक्षम होंगे:
- ✅ VS कोड के लिए Microsoft Foundry Toolkit एक्सटेंशन इंस्टॉल और कॉन्फ़िगर करना
- ✅ मॉडल कैटलॉग में नेविगेट करना और विभिन्न मॉडल स्रोतों को समझना
- ✅ मॉडल परीक्षण और प्रयोग के लिए प्लेग्राउंड का उपयोग करना
- ✅ एजेंट बिल्डर का उपयोग करके कस्टम AI एजेंट बनाना
- ✅ विभिन्न प्रदाताओं के बीच मॉडल प्रदर्शन की तुलना करना
- ✅ प्रॉम्प्ट इंजीनियरिंग के लिए सर्वोत्तम प्रथाओं को लागू करना

## 🧠 Microsoft Foundry Toolkit का परिचय

**Microsoft Foundry Toolkit एक्सटेंशन फॉर VS कोड** Microsoft का प्रमुख एक्सटेंशन है जो VS कोड को एक व्यापक AI विकास पर्यावरण में बदल देता है। यह AI शोध और व्यावहारिक अनुप्रयोग विकास के बीच की खाई को पाटता है, जिससे सभी कौशल स्तर के डेवलपर्स के लिए जनरेटिव AI सुलभ हो जाता है।

### 🌟 प्रमुख क्षमताएँ

| विशेषता | विवरण | उपयोग मामला |
|---------|-------------|----------|
| **🗂️ मॉडल कैटलॉग** | GitHub, ONNX, OpenAI, Anthropic, Google से 100+ मॉडल तक पहुँच | मॉडल खोज और चयन |
| **🔌 BYOM समर्थन** | अपने स्वयं के मॉडल (स्थानीय/रिमोट) को एकीकृत करें | कस्टम मॉडल तैनाती |
| **🎮 इंटरैक्टिव प्लेग्राउंड** | चैट इंटरफेस के साथ रियल-टाइम मॉडल परीक्षण | त्वरित प्रोटोटाइपिंग और परीक्षण |
| **📎 मल्टी-मोडल समर्थन** | टेक्स्ट, छवियां, और अटैचमेंट संभालें | जटिल AI अनुप्रयोग |
| **⚡ बैच प्रोसेसिंग** | एक साथ कई प्रॉम्प्ट चलाएँ | कुशल परीक्षण वर्कफ़्लोज़ |
| **📊 मॉडल मूल्यांकन** | इन-बिल्ट मैट्रिक्स (F1, प्रासंगिकता, समानता, सहमति) | प्रदर्शन आकलन |

### 🎯 Microsoft Foundry Toolkit महत्वपूर्ण क्यों है

- **🚀 तेज़ विकास**: मिनटों में विचार से प्रोटोटाइप तक
- **🔄 एकीकृत वर्कफ़्लो**: कई AI प्रदाताओं के लिए एक इंटरफ़ेस
- **🧪 आसान प्रयोग**: जटिल सेटअप के बिना मॉडल की तुलना करें
- **📈 प्रोडक्शन रेडी**: प्रोटोटाइप से तैनाती तक सहज संक्रमण

## 🛠️ आवश्यकताएँ और सेटअप

### 📦 Microsoft Foundry Toolkit एक्सटेंशन इंस्टॉल करें

**चरण 1: एक्सटेंशन मार्केटप्लेस तक पहुँचें**
1. Visual Studio Code खोलें
2. एक्सटेंशन्स व्यू पर जाएं (`Ctrl+Shift+X` या `Cmd+Shift+X`)
3. "Microsoft Foundry Toolkit" खोजें

**चरण 2: अपनी वर्शन चुनें**
- **🟢 रिलीज़**: प्रोडक्शन उपयोग के लिए अनुशंसित
- **🔶 प्री-रिलीज़**: अत्याधुनिक फीचर्स के लिए प्रारंभिक पहुँच

**चरण 3: इंस्टॉल और सक्रिय करें**

![Microsoft Foundry Toolkit Extension](../../../../translated_images/hi/aitkext.d28945a03eed003c.webp)

### ✅ सत्यापन चेकलिस्ट
- [ ] Microsoft Foundry Toolkit आइकन VS कोड साइडबार में दिख रहा है
- [ ] एक्सटेंशन सक्षम और सक्रिय है
- [ ] आउटपुट पैनल में कोई इंस्टॉलेशन त्रुटि नहीं है

## 🧪 हैंड्स-ऑन अभ्यास 1: GitHub मॉडलों का पता लगाना

**🎯 उद्देश्य**: मॉडल कैटलॉग में महारत हासिल करें और अपना पहला AI मॉडल परीक्षण करें

### 📊 चरण 1: मॉडल कैटलॉग में नेविगेट करें

मॉडल कैटलॉग AI इकोसिस्टम का आपका गेटवे है। यह कई प्रदाताओं से मॉडल एकत्रित करता है, जिससे विकल्पों की खोज और तुलना आसान हो जाती है।

**🔍 नेविगेशन गाइड:**

Microsoft Foundry Toolkit साइडबार में **MODELS - Catalog** पर क्लिक करें

![Model Catalog](../../../../translated_images/hi/aimodel.263ed2be013d8fb0.webp)

**💡 प्रो टिप**: उन मॉडलों को देखें जिनमें आपकी उपयोग स्थिति के अनुरूप विशिष्ट क्षमताएँ हों (जैसे, कोड जनरेशन, क्रिएटिव राइटिंग, विश्लेषण)।

**⚠️ नोट**: GitHub-होस्ट किए गए मॉडल (जैसे GitHub मॉडल) उपयोग के लिए मुफ्त हैं लेकिन अनुरोधों और टोकनों पर दर सीमाओं (rate limits) के अधीन हैं। यदि आप गैर-GitHub मॉडल (जैसे Azure AI या अन्य एन्डपॉइंट्स द्वारा होस्ट किए गए बाहरी मॉडल) का उपयोग करना चाहते हैं, तो आपको उपयुक्त API कुंजी या प्रमाणीकरण प्रदान करना आवश्यक होगा।

### 🚀 चरण 2: अपना पहला मॉडल जोड़ें और कॉन्फ़िगर करें

**मॉडल चयन रणनीति:**
- **GPT-4.1**: जटिल तर्क और विश्लेषण के लिए सर्वोत्तम
- **Phi-4-mini**: सरल कार्यों के लिए हल्का, तेज़ प्रतिक्रिया

**🔧 कॉन्फ़िगरेशन प्रक्रिया:**
1. कैटलॉग से **OpenAI GPT-4.1** चुनें
2. **Add to My Models** पर क्लिक करें - यह मॉडल को उपयोग के लिए पंजीकृत करता है
3. **Try in Playground** चुनें ताकि परीक्षण वातावरण शुरू हो सके
4. मॉडल आरंभ हो जाने तक प्रतीक्षा करें (पहली बार सेटअप में कुछ समय लग सकता है)

![Playground Setup](../../../../translated_images/hi/playground.dd6f5141344878ca.webp)

**⚙️ मॉडल पैरामीटर समझना:**
- **Temperature**: रचनात्मकता नियंत्रित करता है (0 = निर्धारक, 1 = रचनात्मक)
- **Max Tokens**: अधिकतम प्रतिक्रिया लंबाई
- **Top-p**: प्रतिक्रिया विविधता के लिए न्यूक्लियस सैंपलिंग

### 🎯 चरण 3: प्लेग्राउंड इंटरफ़ेस में महारत हासिल करें

प्लेग्राउंड आपका AI प्रयोगशाला है। इसे अधिकतम उपयोग करने के लिए:

**🎨 प्रॉम्प्ट इंजीनियरिंग सर्वोत्तम प्रथाएं:**
1. **विशिष्ट बनें**: स्पष्ट, विस्तृत निर्देश बेहतर परिणाम देते हैं
2. **संदर्भ प्रदान करें**: संबंधित पृष्ठभूमि जानकारी शामिल करें
3. **उदाहरणों का उपयोग करें**: मॉडल को उदाहरण दिखाएं कि आप क्या चाहते हैं
4. **परिष्कृत करें**: प्रारंभिक परिणामों के आधार पर प्रॉम्प्ट को सुधारें

**🧪 परीक्षण परिदृश्य:**
```markdown
# Example 1: Code Generation
"Write a Python function that calculates the factorial of a number using recursion. Include error handling and docstrings."

# Example 2: Creative Writing
"Write a professional email to a client explaining a project delay, maintaining a positive tone while being transparent about challenges."

# Example 3: Data Analysis
"Analyze this sales data and provide insights: [paste your data]. Focus on trends, anomalies, and actionable recommendations."
```

![Testing Results](../../../../translated_images/hi/result.1dfcf211fb359cf6.webp)

### 🏆 चुनौती अभ्यास: मॉडल प्रदर्शन तुलना

**🎯 लक्ष्य**: समान प्रॉम्प्ट्स का उपयोग करके विभिन्न मॉडलों की ताकतों को समझने के लिए तुलना करें

**📋 निर्देश:**
1. **Phi-4-mini** को अपने कार्यक्षेत्र में जोड़ें
2. GPT-4.1 और Phi-4-mini दोनों के लिए समान प्रॉम्प्ट का उपयोग करें

![set](../../../../translated_images/hi/set.88132df189ecde2c.webp)

3. प्रतिक्रिया गुणवत्ता, गति, और सटीकता की तुलना करें
4. परिणाम अनुभाग में अपने निष्कर्ष दस्तावेज़ करें

![Model Comparison](../../../../translated_images/hi/compare.97746cd0f9074955.webp)

**💡 खोजने के लिए मुख्य अंतर्दृष्टियाँ:**
- LLM और SLM का उपयोग कब करें
- लागत बनाम प्रदर्शन व्यापार-offs
- विभिन्न मॉडलों की विशिष्ट क्षमताएं

## 🤖 हैंड्स-ऑन अभ्यास 2: एजेंट बिल्डर के साथ कस्टम एजेंट बनाना

**🎯 उद्देश्य**: विशिष्ट कार्यों और वर्कफ़्लोज़ के लिए विशेष AI एजेंट बनाएँ

### 🏗️ चरण 1: एजेंट बिल्डर को समझना

एजेंट बिल्डर वह जगह है जहाँ Microsoft Foundry Toolkit वास्तव में चमकता है। यह आपको बड़े भाषा मॉडलों की शक्ति को कस्टम निर्देशों, विशिष्ट पैरामीटर, और विशेषज्ञ ज्ञान के साथ जोड़कर उद्देश्य-निर्मित AI सहायक बनाने की अनुमति देता है।

**🧠 एजेंट वास्तुकला घटक:**
- **कोर मॉडल**: मूल LLM (GPT-4, Groks, Phi, आदि)
- **सिस्टम प्रॉम्प्ट**: एजेंट की व्यक्तित्व और व्यवहार को परिभाषित करता है
- **पैरामीटर**: इष्टतम प्रदर्शन के लिए फाइन-ट्यून सेटिंग्स
- **टूल्स इंटीग्रेशन**: बाहरी API और MCP सेवाओं से कनेक्ट करें
- **मेमोरी**: संवाद संदर्भ और सत्र स्थिरता

![Agent Builder Interface](../../../../translated_images/hi/agentbuilder.25895b2d2f8c02e7.webp)

### ⚙️ चरण 2: एजेंट कॉन्फ़िगरेशन गहराई से समझना

**🎨 प्रभावी सिस्टम प्रॉम्प्ट बनाना:**
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

*बेशक, आप Generate System Prompt का उपयोग कर AI की मदद से प्रॉम्प्ट उत्पन्न और अनुकूलित कर सकते हैं*

**🔧 पैरामीटर अनुकूलन:**
| पैरामीटर | अनुशंसित सीमा | उपयोग मामला |
|-----------|------------------|----------|
| **Temperature** | 0.1-0.3 | तकनीकी/तथ्यात्मक प्रतिक्रियाएं |
| **Temperature** | 0.7-0.9 | रचनात्मक/मंथन कार्य |
| **Max Tokens** | 500-1000 | संक्षिप्त प्रतिक्रियाएं |
| **Max Tokens** | 2000-4000 | विस्तृत विवरण |

### 🐍 चरण 3: व्यावहारिक अभ्यास - पाइथन प्रोग्रामिंग एजेंट

**🎯 मिशन**: एक विशिष्ट पाइथन कोडिंग सहायक बनाना

**📋 कॉन्फ़िगरेशन चरण:**

1. **मॉडल चयन**: **Claude 3.5 Sonnet** चुनें (कोड के लिए उत्कृष्ट)

2. **सिस्टम प्रॉम्प्ट डिजाइन**:
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

3. **पैरामीटर कॉन्फ़िगरेशन**:
   - Temperature: 0.2 (सुसंगत, विश्वसनीय कोड के लिए)
   - Max Tokens: 2000 (विस्तृत स्पष्टीकरण)
   - Top-p: 0.9 (संतुलित रचनात्मकता)

![Python Agent Configuration](../../../../translated_images/hi/pythonagent.5e51b406401c165f.webp)

### 🧪 चरण 4: अपने पाइथन एजेंट का परीक्षण करें

**परीक्षण परिदृश्य:**
1. **मूल कार्य**: "एक फंक्शन बनाएं जो अभाज्य संख्याएं खोजे"
2. **जटिल एल्गोरिथ्म**: "इन्सर्ट, डिलीट और सर्च मेथड्स के साथ बाइनरी सर्च ट्री लागू करें"
3. **वास्तविक दुनिया की समस्या**: "एक वेब स्क्रैपर बनाएं जो दर सीमांकन और पुनः प्रयास संभाले"
4. **डिबगिंग**: "इस कोड को ठीक करें [दूषित कोड पेस्ट करें]"

**🏆 सफलता मानदंड:**
- ✅ कोड त्रुटि मुक्त चलता है
- ✅ उचित दस्तावेज़ीकरण शामिल है
- ✅ पाइथन सर्वोत्तम प्रथाओं का पालन करता है
- ✅ स्पष्ट स्पष्टीकरण प्रदान करता है
- ✅ सुधार सुझाव देता है

## 🎓 मॉड्यूल 1 समापन और अगले कदम

### 📊 ज्ञान परीक्षण

अपनी समझ का परीक्षण करें:
- [ ] क्या आप कैटलॉग में मॉडलों के बीच का अंतर समझा सकते हैं?
- [ ] क्या आपने सफलतापूर्वक एक कस्टम एजेंट बनाया और परीक्षण किया है?
- [ ] क्या आप विभिन्न उपयोग मामलों के लिए पैरामीटर अनुकूलित करना जानते हैं?
- [ ] क्या आप प्रभावी सिस्टम प्रॉम्प्ट डिज़ाइन कर सकते हैं?

### 📚 अतिरिक्त संसाधन

- **Microsoft Foundry Toolkit दस्तावेज़ीकरण**: [Official Microsoft Docs](https://github.com/microsoft/vscode-ai-toolkit)
- **प्रॉम्प्ट इंजीनियरिंग गाइड**: [Best Practices](https://platform.openai.com/docs/guides/prompt-engineering)
- **Microsoft Foundry Toolkit में मॉडल्स**: [Models in Develpment](https://github.com/microsoft/vscode-ai-toolkit/blob/main/doc/models.md)

**🎉 बधाई हो!** आपने Microsoft Foundry Toolkit के मूल ज्ञान में महारत हासिल कर ली है और अब आप और अधिक उन्नत AI एप्लिकेशन बनाने के लिए तैयार हैं!

### 🔜 अगले मॉड्यूल पर जारी रखें

अधिक उन्नत क्षमताओं के लिए तैयार हैं? जारी रखें **[मॉड्यूल 2: MCP with Microsoft Foundry Toolkit Fundamentals](../lab2/README.md)** जहाँ आप सीखेंगे कि कैसे:
- अपने एजेंट्स को बाहरी टूल्स से Model Context Protocol (MCP) के जरिए जोड़ें
- Playwright के साथ ब्राउज़र ऑटोमेशन एजेंट बनाएं
- MCP सर्वर्स को अपने Microsoft Foundry Toolkit एजेंट्स के साथ एकीकृत करें
- बाहरी डेटा और क्षमताओं के साथ अपने एजेंट्स को सुपरचार्ज करें

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
इस दस्तावेज़ का अनुवाद AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) का उपयोग करके किया गया है। जबकि हम सटीकता के लिए प्रयास करते हैं, कृपया ध्यान दें कि स्वचालित अनुवादों में त्रुटियाँ या अशुद्धियाँ हो सकती हैं। मूल दस्तावेज़ अपनी मूल भाषा में ही प्रामाणिक स्रोत माना जाना चाहिए। महत्वपूर्ण जानकारी के लिए, पेशेवर मानव अनुवाद की सिफारिश की जाती है। इस अनुवाद के उपयोग से उत्पन्न किसी भी गलतफहमी या गलत व्याख्या के लिए हम उत्तरदायी नहीं हैं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->