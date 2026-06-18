# 🚀 Moduli 1: Msingi wa Microsoft Foundry Toolkit

[![Duration](https://img.shields.io/badge/Duration-15%20minutes-blue.svg)]()
[![Difficulty](https://img.shields.io/badge/Difficulty-Beginner-green.svg)]()
[![Prerequisites](https://img.shields.io/badge/Prerequisites-VS%20Code-orange.svg)]()

## 📋 Malengo ya Kujifunza

Mwisho wa moduli hii, utaweza:
- ✅ Sakinisha na usanidi Microsoft Foundry Toolkit Extension kwa VS Code
- ✅ Pitia Katalogi ya Mfano na kuelewa vyanzo mbalimbali vya mfano
- ✅ Tumia Playground kwa ajili ya kupima na kujaribu modeli
- ✅ Tengeneza maajenti wa AI maalum ukitumia Agent Builder
- ✅ Linganisha utendaji wa modeli kati ya watoa huduma tofauti
- ✅ Tumia mbinu bora za uhandisi wa maagizo

## 🧠 Utangulizi wa Microsoft Foundry Toolkit

**Microsoft Foundry Toolkit Extension kwa VS Code** ni uk/extensions wa kitalii wa Microsoft unaobadilisha VS Code kuwa mazingira kamili ya maendeleo ya AI. Unavutia utafiti wa AI na maendeleo ya maombi halisi, na kufanya AI ya uzalishaji ipatikane kwa waendelezaji wa viwango vyote vya ujuzi.

### 🌟 Uwezo Muhimu

| Kipengele | Maelezo | Matumizi |
|---------|-------------|----------|
| **🗂️ Katalogi ya Mfano** | Fahamu zaidi ya modeli 100 kutoka GitHub, ONNX, OpenAI, Anthropic, Google | Ugunduzi na uchaguzi wa modeli |
| **🔌 Usaidizi wa BYOM** | Jumlisha modeli zako mwenyewe (za ndani/za mbali) | Utekelezaji wa modeli maalum |
| **🎮 Playground ya Kuingiliana** | Jaribu modeli papo hapo kwa kutumia kiolesura cha mazungumzo | Prototyping na upimaji wa kasi |
| **📎 Usaidizi wa Multi-Modal** | Shughulikia maandishi, picha, na viambatisho | Maombi magumu ya AI |
| **⚡ Usindikaji wa Batch** | Endesha maagizo mengi kwa wakati mmoja | Mtiririko wa kazi wenye ufanisi |
| **📊 Tathmini ya Mfano** | Vipimo vilivyojengwa (F1, umuhimu, ufananishi, ulinganifu) | Tathmini ya utendaji |

### 🎯 Kwa Nini Microsoft Foundry Toolkit Ni Muhimu

- **🚀 Maendeleo ya Kasi**: Kutoka wazo hadi prototipu kwa dakika chache
- **🔄 Mtiririko Moja Imara**: Kiolesura kimoja kwa watoa huduma mbalimbali za AI
- **🧪 Jaribio Rahisi**: Linganisha modeli bila usanidi mgumu
- **📈 Tayari kwa Uzalishaji**: Mabadiliko rahisi kutoka prototipu hadi utekelezaji

## 🛠️ Masharti & Usanidi

### 📦 Sakinisha Microsoft Foundry Toolkit Extension

**Hatua 1: Fikia Soko la Extensions**
1. Fungua Visual Studio Code
2. Nenda kwenye sehemu ya Extensions (`Ctrl+Shift+X` au `Cmd+Shift+X`)
3. Tafuta "Microsoft Foundry Toolkit"

**Hatua 2: Chagua Toleo Lako**
- **🟢 Toleo la Kutolewa**: Inapendekezwa kwa matumizi ya uzalishaji
- **🔶 Toleo la Awali**: Upatikanaji wa mapema kwa vipengele vya kisasa

**Hatua 3: Sakinisha na Washa**

![Microsoft Foundry Toolkit Extension](../../../../translated_images/sw/aitkext.d28945a03eed003c.webp)

### ✅ Orodha ya Ukaguzi
- [ ] Ikoni ya Microsoft Foundry Toolkit inaonekana kwenye upau wa VS Code
- [ ] Extension imewezeshwa na imewashwa
- [ ] Hakuna makosa ya usakinishaji kwenye jopo la matokeo

## 🧪 Zozi la Vitendo 1: Kuchunguza Modeli za GitHub

**🎯 Lengo**: Zaidi kuelewa Katalogi ya Mfano na jaribu mfano wako wa kwanza wa AI

### 📊 Hatua 1: Pitia Katalogi ya Mfano

Katalogi ya Mfano ni lango lao kwa mfumo wa AI. Inakusanya modeli kutoka kwa watoa wengi, ikifanya iwe rahisi kugundua na kulinganisha chaguzi.

**🔍 Mwongozo wa Kuvi naviga:**

Bonyeza **MODELS - Catalog** kwenye upau wa Microsoft Foundry Toolkit

![Model Catalog](../../../../translated_images/sw/aimodel.263ed2be013d8fb0.webp)

**💡 Ushauri wa Mtaalamu**: Tazama modeli zilizo na uwezo maalum unaolingana na matakwa yako (mfano, uzalisaji wa code, uandishi wa ubunifu, uchambuzi).

**⚠️ Kumbuka**: Modeli zilizohifadhiwa GitHub (yaani GitHub Models) zinaweza kutumika bure lakini zinaruhusiwa kwa kiwango fulani cha maombi na tokeni. Ikiwa unataka kutumia modeli zisizo za GitHub (yaani, modeli za nje zilizo kwenye Azure AI au sehemu nyingine), utahitaji kusambaza API key au uthibitisho unaofaa.

### 🚀 Hatua 2: Ongeza na Sanidi Mfano Wako wa Kwanza

**Mikakati ya Uchaguzi wa Mfano:**
- **GPT-4.1**: Bora kwa sababu za kweli ngumu na uchambuzi
- **Phi-4-mini**: Uzito mdogo, majibu ya haraka kwa kazi rahisi

**🔧 Mchakato wa Usanidi:**
1. Chagua **OpenAI GPT-4.1** kutoka katalogi
2. Bonyeza **Add to My Models** - hili linaleta mfano kwa matumizi
3. Chagua **Try in Playground** ili kufungua mazingira ya majaribio
4. Subiri kuanzishwa kwa mfano (usanidi wa mara ya kwanza unaweza kuchukua muda kidogo)

![Playground Setup](../../../../translated_images/sw/playground.dd6f5141344878ca.webp)

**⚙️ Kuelewa Vigezo vya Mfano:**
- **Temperature**: Inasimamia ubunifu (0 = uhakika, 1 = ubunifu)
- **Max Tokens**: Urefu wa majibu kwa kiwango kikubwa zaidi
- **Top-p**: Sampuli ya msingi kwa utofauti wa majibu

### 🎯 Hatua 3: Fahamu Kiolesura cha Playground

Playground ni maabara yako ya majaribio ya AI. Hapa ni jinsi ya kuitumia kwa ufanisi:

**🎨 Mbinu Bora za Uhandisi wa Maagizo:**
1. **Kuwa Maelezo**: Maelekezo wazi na ya kina hutoa matokeo bora
2. **Toa Muktadha**: Jumuisha taarifa muhimu za nyuma
3. **Tumia Mifano**: Onyesha mfano unachotaka kwa kutumia mifano
4. **Rudia**: Boreshaji maagizo kulingana na matokeo ya awali

**🧪 Matarajio ya Majaribio:**
```markdown
# Example 1: Code Generation
"Write a Python function that calculates the factorial of a number using recursion. Include error handling and docstrings."

# Example 2: Creative Writing
"Write a professional email to a client explaining a project delay, maintaining a positive tone while being transparent about challenges."

# Example 3: Data Analysis
"Analyze this sales data and provide insights: [paste your data]. Focus on trends, anomalies, and actionable recommendations."
```

![Testing Results](../../../../translated_images/sw/result.1dfcf211fb359cf6.webp)

### 🏆 Zozi la Changamoto: Linganisha Utendaji wa Modeli

**🎯 Lengo**: Linganisha modeli tofauti ukitumia maagizo sawa kuelewa nguvu zao

**📋 Maagizo:**
1. Ongeza **Phi-4-mini** kwenye eneo la kazi lako
2. Tumia agizo moja kwa GPT-4.1 na Phi-4-mini

![set](../../../../translated_images/sw/set.88132df189ecde2c.webp)

3. Linganisha ubora wa majibu, kasi, na usahihi
4. Andika matokeo yako katika sehemu ya matokeo

![Model Comparison](../../../../translated_images/sw/compare.97746cd0f9074955.webp)

**💡 Mawazo Muhimu ya Kugundua:**
- Wakati wa kutumia LLM vs SLM
- Marudio kati ya gharama na utendaji
- Uwezo maalum wa modeli tofauti

## 🤖 Zozi la Vitendo 2: Kujenga Maajenti Maalum kwa Agent Builder

**🎯 Lengo**: Tengeneza maajenti wa AI maalum yaliyoandaliwa kwa kazi na mtiririko maalum

### 🏗️ Hatua 1: Fahamu Agent Builder

Agent Builder ni sehemu ambapo Microsoft Foundry Toolkit inatoa huduma kubwa. Inkuruhusu kuunda wasaidizi wa AI wa kusudi maalum wanaounganisha nguvu za lugha kubwa za modeli na maagizo maalum, vigezo maalum, na maarifa ya kipekee.

**🧠 Sehemu za Muundo wa Maajenti:**
- **Mfano Msingi**: LLM ya msingi (GPT-4, Groks, Phi, nk.)
- **Agizo la Mfumo**: Sifa na tabia za maajenti
- **Vigezo**: Mipangilio iliyoboreshwa kwa utendaji bora
- **Uunganisho wa Zana**: Unganisha na API za nje na huduma za MCP
- **Kumbukumbu**: Muktadha wa mazungumzo na uhifadhi wa kikao

![Agent Builder Interface](../../../../translated_images/sw/agentbuilder.25895b2d2f8c02e7.webp)

### ⚙️ Hatua 2: Chunguza Usanidi wa Maajenti Kwa Kina

**🎨 Kuunda Maagizo Bora ya Mfumo:**
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

*Bila shaka, unaweza pia kutumia Generate System Prompt ili kutumia AI kusaidia kuzalisha na kuboresha maagizo*

**🔧 Uboreshaji wa Vigezo:**
| Kigezo | Mzunguko Unaopendekezwa | Matumizi |
|-----------|------------------|----------|
| **Temperature** | 0.1-0.3 | Majibu ya kiufundi/ya kweli |
| **Temperature** | 0.7-0.9 | Kazi za ubunifu na ubunifu wa mawazo |
| **Max Tokens** | 500-1000 | Majibu mafupi |
| **Max Tokens** | 2000-4000 | Maelezo ya kina |

### 🐍 Hatua 3: Zozi la Vitendo - Maajenti wa Kuprogramu Python

**🎯 Mhadhara**: Tengeneza msaidizi maalum wa kuandika programu kwa Python

**📋 Hatua za Usanidi:**

1. **Uchaguzi wa Mfano**: Chagua **Claude 3.5 Sonnet** (bora kwa code)

2. **Ubunifu wa Agizo la Mfumo**:
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

3. **Usanidi wa Vigezo**:
   - Temperature: 0.2 (kwa code thabiti na ya kuaminika)
   - Max Tokens: 2000 (maelezo ya kina)
   - Top-p: 0.9 (ubunifu ulio sawa)

![Python Agent Configuration](../../../../translated_images/sw/pythonagent.5e51b406401c165f.webp)

### 🧪 Hatua 4: Jaribu Maajenti Wako wa Python

**Matarajio ya Majaribio:**
1. **Kazi ya Msingi**: "Tengeneza kazi ya kutafuta nambari za kwanza"
2. **Algoritmi Ngumu**: "Tekeleza mti wa binary search na insert, delete, na njia za kutafuta"
3. **Tatizo Halisi**: "Jenga mchambuzi wa wavuti unaoshughulikia vikwazo vya kiwango na jaribio la tena"
4. **Kurekebisha Makosa**: "Rekebisha hii code [bandika code yenye hitilafu]"

**🏆 Vigezo vya Mafanikio:**
- ✅ Code inaendeshwa bila makosa
- ✅ Inajumuisha nyaraka sahihi
- ✅ Inafuata mbinu bora za Python
- ✅ Inatoa maelezo wazi
- ✅ Inapendekeza maboresho

## 🎓 Muhtasari wa Moduli 1 & Hatua Zinazo Fuata

### 📊 Mtihani wa Maarifa

Jaribu uelewa wako:
- [ ] Je, unaweza kuelezea tofauti kati ya modeli kwenye katalogi?
- [ ] Je, umefanikiwa kuunda na kujaribu maajenti maalum?
- [ ] Je, unaelewa jinsi ya kuboresha vigezo kwa matumizi tofauti?
- [ ] Je, unaweza kubuni maagizo bora ya mfumo?

### 📚 Rasilimali Zingine

- **Nyaraka za Microsoft Foundry Toolkit**: [Official Microsoft Docs](https://github.com/microsoft/vscode-ai-toolkit)
- **Mwongozo wa Uhandisi wa Maagizo**: [Mbinu Bora](https://platform.openai.com/docs/guides/prompt-engineering)
- **Modeli katika Microsoft Foundry Toolkit**: [Modeli Katika Maendeleo](https://github.com/microsoft/vscode-ai-toolkit/blob/main/doc/models.md)

**🎉 Hongera!** Umejifunza misingi ya Microsoft Foundry Toolkit na uko tayari kutengeneza maombi ya AI yaliyo na maendeleo zaidi!

### 🔜 Endelea kwa Moduli Ifuatayo

Uko tayari kwa uwezo wa hali ya juu zaidi? Endelea kwenda **[Moduli 2: MCP na Microsoft Foundry Toolkit Fundamentals](../lab2/README.md)** ambapo utajifunza:
- Kuunganisha maajenti yako na zana za nje ukitumia Model Context Protocol (MCP)
- Kujenga maajenti ya utumiaji wa kivinjari kwa Playwright
- Kuunganisha seva za MCP na maajenti yako ya Microsoft Foundry Toolkit
- Kuongeza nguvu maajenti yako kwa data na uwezo wa nje

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Kionyozo**:
Hati hii imetafsiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kupata usahihi, tafadhali fahamu kwamba tafsiri za kiotomatiki zinaweza kuwa na makosa au upungufu wa usahihi. Hati ya asili katika lugha yake halisi inapaswa kuchukuliwa kama chanzo cha mamlaka. Kwa taarifa muhimu, tafsiri ya kitaalamu inayofanywa na binadamu inapendekezwa. Hatutojibu kwa kuelewa vibaya au tafsiri potofu zinazotokea kutokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->