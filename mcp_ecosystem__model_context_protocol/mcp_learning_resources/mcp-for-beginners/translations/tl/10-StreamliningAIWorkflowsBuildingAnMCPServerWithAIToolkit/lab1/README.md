# 🚀 Module 1: Mga Pangunahing Kaalaman sa Microsoft Foundry Toolkit

[![Duration](https://img.shields.io/badge/Duration-15%20minutes-blue.svg)]()
[![Difficulty](https://img.shields.io/badge/Difficulty-Beginner-green.svg)]()
[![Prerequisites](https://img.shields.io/badge/Prerequisites-VS%20Code-orange.svg)]()

## 📋 Mga Layunin sa Pagkatuto

Sa pagtatapos ng modyul na ito, magagawa mong:
- ✅ Mag-install at mag-configure ng Microsoft Foundry Toolkit Extension para sa VS Code
- ✅ Mag-navigate sa Model Catalog at maunawaan ang iba't ibang pinanggalingan ng modelo
- ✅ Gamitin ang Playground para sa pagsubok at eksperimento ng mga modelo
- ✅ Gumawa ng pasadyang mga AI agent gamit ang Agent Builder
- ✅ Ihambing ang performance ng mga modelo sa iba't ibang provider
- ✅ I-apply ang mga pinakamahusay na kasanayan sa prompt engineering

## 🧠 Panimula sa Microsoft Foundry Toolkit

Ang **Microsoft Foundry Toolkit Extension para sa VS Code** ay ang pangunahing extension ng Microsoft na nagbabago sa VS Code bilang isang komprehensibong kapaligiran para sa pag-develop ng AI. Ito ay nag-uugnay sa pagitan ng AI research at praktikal na pagbuo ng aplikasyon, na ginagawang accessible ang generative AI para sa mga developer kahit anong antas ng kasanayan.

### 🌟 Mga Pangunahing Kakayahan

| Tampok | Paglalarawan | Gamit |
|---------|-------------|----------|
| **🗂️ Model Catalog** | Access sa 100+ na mga modelo mula sa GitHub, ONNX, OpenAI, Anthropic, Google | Paghahanap at pagpili ng modelo |
| **🔌 BYOM Support** | Integrasyon ng sarili mong mga modelo (lokal o remote) | Deployment ng pasadyang modelo |
| **🎮 Interactive Playground** | Real-time na pagsubok ng modelo gamit ang chat interface | Mabilisang prototyping at pagsubok |
| **📎 Multi-Modal Support** | Pagsuporta sa texto, larawan, at mga attachment | Komplikadong AI na aplikasyon |
| **⚡ Batch Processing** | Pagsasagawa ng maraming prompt nang sabay-sabay | Epektibong testing workflow |
| **📊 Model Evaluation** | Nakapaloob na mga metrics (F1, relevance, similarity, coherence) | Pagtatasa ng performance |

### 🎯 Bakit Mahalaga ang Microsoft Foundry Toolkit

- **🚀 Pinabilis na Pag-develop**: Mula sa ideya hanggang prototype sa loob ng ilang minuto
- **🔄 Isang Daloy ng Trabaho**: Isang interface para sa iba't ibang AI provider
- **🧪 Madaling Eksperimento**: Paghahambing ng mga modelo nang walang komplikadong setup
- **📈 Handa para sa Produksyon**: Walang putol na paglipat mula prototype hanggang deployment

## 🛠️ Mga Kinakailangan at Pagsasaayos

### 📦 Mag-install ng Microsoft Foundry Toolkit Extension

**Hakbang 1: Puntahan ang Extensions Marketplace**
1. Buksan ang Visual Studio Code
2. Pumunta sa Extensions view (`Ctrl+Shift+X` o `Cmd+Shift+X`)
3. Maghanap ng "Microsoft Foundry Toolkit"

**Hakbang 2: Piliin ang Iyong Bersyon**
- **🟢 Release**: Inirerekomenda para sa produksyon
- **🔶 Pre-release**: Maagang access sa mga pinakabagong feature

**Hakbang 3: I-install at I-activate**

![Microsoft Foundry Toolkit Extension](../../../../translated_images/tl/aitkext.d28945a03eed003c.webp)

### ✅ Checklist ng Pagpapatunay
- [ ] Lumilitaw ang Microsoft Foundry Toolkit icon sa sidebar ng VS Code
- [ ] Na-enable at na-activate ang extension
- [ ] Walang error sa pag-install sa output panel

## 🧪 Hands-on Exercise 1: Pagsusuri ng mga Modelo sa GitHub

**🎯 Layunin**: Maging eksperto sa Model Catalog at subukan ang iyong unang AI modelo

### 📊 Hakbang 1: Mag-navigate sa Model Catalog

Ang Model Catalog ang iyong pintuan sa AI ecosystem. Pinagsasama nito ang mga modelo mula sa iba't ibang provider para madali kang makahanap at makapaghambing ng mga opsyon.

**🔍 Gabay sa Navigation:**

I-click ang **MODELS - Catalog** sa Microsoft Foundry Toolkit sidebar

![Model Catalog](../../../../translated_images/tl/aimodel.263ed2be013d8fb0.webp)

**💡 Tip**: Maghanap ng mga modelo na may partikular na kakayahan na angkop sa iyong gamit (hal. paggawa ng code, malikhaing pagsulat, pagsusuri).

**⚠️ Paalala**: Ang mga modelong naka-host sa GitHub (GitHub Models) ay libre gamitin ngunit may mga limitasyon sa bilis ng request at token. Kung nais mong ma-access ang mga non-GitHub na modelo (hal. external models na naka-host sa Azure AI o sa iba pang endpoints), kailangan mong magbigay ng tamang API key o awtentikasyon.

### 🚀 Hakbang 2: Idagdag at I-configure ang Iyong Unang Modelo

**Strategiya sa Pagpili ng Modelo:**
- **GPT-4.1**: Pinakamainam para sa kumplikadong pangangatwiran at pagsusuri
- **Phi-4-mini**: Magaan, mabilis ang tugon para sa simpleng mga gawain

**🔧 Proseso ng Configuration:**
1. Piliin ang **OpenAI GPT-4.1** mula sa catalog
2. I-click ang **Add to My Models** - itatala nito ang modelo para magamit
3. Piliin ang **Try in Playground** para ilunsad ang testing environment
4. Maghintay ng model initialization (ang unang setup ay maaaring tumagal ng kaunti)

![Playground Setup](../../../../translated_images/tl/playground.dd6f5141344878ca.webp)

**⚙️ Pag-unawa sa Model Parameters:**
- **Temperature**: Kumokontrol sa pagkamalikhain (0 = deterministik, 1 = malikhain)
- **Max Tokens**: Pinakamahabang tugon
- **Top-p**: Nucleus sampling para sa pagkakaiba-iba ng tugon

### 🎯 Hakbang 3: Masterin ang Playground Interface

Ang Playground ang iyong laboratoryo para sa eksperimento sa AI. Narito kung paano ma-maximize ang potensyal nito:

**🎨 Pinakamahusay na Kasanayan sa Prompt Engineering:**
1. **Maging Tiyak**: Malinaw at detalyadong mga tagubilin para sa mas maganda ang resulta
2. **Magbigay ng Konteksto**: Isama ang mahalagang background na impormasyon
3. **Gumamit ng Mga Halimbawa**: Ipakita sa modelo ang gusto mo gamit ang mga halimbawa
4. **Ulitin**: Pagbutihin ang mga prompt batay sa unang resulta

**🧪 Mga Scenario sa Pagsubok:**
```markdown
# Example 1: Code Generation
"Write a Python function that calculates the factorial of a number using recursion. Include error handling and docstrings."

# Example 2: Creative Writing
"Write a professional email to a client explaining a project delay, maintaining a positive tone while being transparent about challenges."

# Example 3: Data Analysis
"Analyze this sales data and provide insights: [paste your data]. Focus on trends, anomalies, and actionable recommendations."
```

![Testing Results](../../../../translated_images/tl/result.1dfcf211fb359cf6.webp)

### 🏆 Hamon: Paghahambing ng Performance ng Modelo

**🎯 Layunin**: Ihambing ang iba't ibang modelo gamit ang magkakaparehong prompt upang maunawaan ang kanilang kalakasan

**📋 Mga Tagubilin:**
1. Idagdag ang **Phi-4-mini** sa iyong workspace
2. Gamitin ang parehong prompt para sa GPT-4.1 at Phi-4-mini

![set](../../../../translated_images/tl/set.88132df189ecde2c.webp)

3. Ihambing ang kalidad ng tugon, bilis, at katumpakan
4. I-dokumento ang iyong mga natuklasan sa seksyon ng mga resulta

![Model Comparison](../../../../translated_images/tl/compare.97746cd0f9074955.webp)

**💡 Mahahalagang Insight na Malalaman:**
- Kailan gagamitin ang LLM kumpara sa SLM
- Pag-aayos ng gastos vs. performance
- Espesyal na kakayahan ng iba't ibang modelo

## 🤖 Hands-on Exercise 2: Paggawa ng Pasadyang Mga Agent gamit ang Agent Builder

**🎯 Layunin**: Gumawa ng mga espesyal na AI agent na angkop sa partikular na gawain at workflows

### 🏗️ Hakbang 1: Pag-unawa sa Agent Builder

Ang Agent Builder ang tampok na talagang nagpapalabas ng galing ng Microsoft Foundry Toolkit. Pinapayagan kang lumikha ng mga AI assistant na nakatuon sa layunin na pinagsasama ang lakas ng large language models sa pasadyang mga tagubilin, partikular na mga parameter, at espesyal na kaalaman.

**🧠 Mga Bahagi ng Agent Architecture:**
- **Core Model**: Ang pundasyon na LLM (GPT-4, Groks, Phi, atbp.)
- **System Prompt**: Nagpapaliwanag sa personalidad at asal ng agent
- **Parameters**: Pinong-tuning para sa pinakamainam na performance
- **Tools Integration**: Koneksyon sa external APIs at MCP services
- **Memory**: Konteksto ng usapan at pagpapatuloy ng sesyon

![Agent Builder Interface](../../../../translated_images/tl/agentbuilder.25895b2d2f8c02e7.webp)

### ⚙️ Hakbang 2: Malalimang Pag-configure ng Agent

**🎨 Paggawa ng Epektibong System Prompts:**
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

*Siyempre, maaari mo ring gamitin ang Generate System Prompt para tulungan ka ng AI sa pagbuo at pag-optimize ng mga prompt*

**🔧 Pag-optimize ng Parameter:**
| Parameter | Inirekomendang Saklaw | Gamit |
|-----------|-----------------------|-------|
| **Temperature** | 0.1-0.3 | Mga teknikal o tunay na sagot |
| **Temperature** | 0.7-0.9 | Malikhain o brainstorming na gawain |
| **Max Tokens** | 500-1000 | Maikling sagot |
| **Max Tokens** | 2000-4000 | Detalyadong paliwanag |

### 🐍 Hakbang 3: Praktikal na Pagsasanay - Python Programming Agent

**🎯 Misyon**: Gumawa ng espesyal na Python coding assistant

**📋 Mga Hakbang sa Configuration:**

1. **Pagpili ng Modelo**: Piliin ang **Claude 3.5 Sonnet** (magaling sa code)

2. **Disenyo ng System Prompt:**
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

3. **Pag-configure ng Parameter**:
   - Temperature: 0.2 (para sa consistent at maasahang code)
   - Max Tokens: 2000 (detalyadong paliwanag)
   - Top-p: 0.9 (balanseng pagkamalikhain)

![Python Agent Configuration](../../../../translated_images/tl/pythonagent.5e51b406401c165f.webp)

### 🧪 Hakbang 4: Pagsubok ng Iyong Python Agent

**Mga Scenario sa Pagsubok:**
1. **Pangunahing Function**: "Gumawa ng function para hanapin ang mga prime number"
2. **Komplikadong Algorithm**: "I-implement ang binary search tree na may insert, delete, at search methods"
3. **Real-world Problem**: "Gumawa ng web scraper na humahandle ng rate limiting at retries"
4. **Debugging**: "Ayusin ang code na ito [paste buggy code]"

**🏆 Mga Pamantayan ng Tagumpay:**
- ✅ Tumatakbo ang code nang walang error
- ✅ May tamang dokumentasyon
- ✅ Sumusunod sa pinakamahuhusay na gawain sa Python
- ✅ Nagbibigay ng malinaw na paliwanag
- ✅ Nagsusuggest ng mga pagpapabuti

## 🎓 Pagtatapos ng Module 1 at Mga Susunod na Hakbang

### 📊 Pagsusulit sa Kaalaman

Subukin ang iyong pagkaunawa:
- [ ] Naiipaliwanag mo ba ang pagkakaiba ng mga modelo sa catalog?
- [ ] Nagawa mo na ba nang maayos ang paggawa at pagsusuri ng pasadyang agent?
- [ ] Naiintindihan mo ba kung paano i-optimize ang mga parameter para sa iba't ibang gamit?
- [ ] Kaya mo bang magdisenyo ng epektibong system prompt?

### 📚 Dagdag na Mga Mapagkukunan

- **Microsoft Foundry Toolkit Documentation**: [Official Microsoft Docs](https://github.com/microsoft/vscode-ai-toolkit)
- **Prompt Engineering Guide**: [Best Practices](https://platform.openai.com/docs/guides/prompt-engineering)
- **Mga Modelo sa Microsoft Foundry Toolkit**: [Models in Development](https://github.com/microsoft/vscode-ai-toolkit/blob/main/doc/models.md)

**🎉 Maligayang Pagbati!** Natutunan mo na ang mga pangunahing kaalaman sa Microsoft Foundry Toolkit at handa ka nang bumuo ng mas advanced na AI na mga aplikasyon!

### 🔜 Magpatuloy sa Susunod na Module

Handa ka na ba para sa mas advanced na mga kakayahan? Magpatuloy sa **[Module 2: MCP with Microsoft Foundry Toolkit Fundamentals](../lab2/README.md)** kung saan matututuhan mo kung paano:
- Ikonekta ang iyong mga agent sa mga external tools gamit ang Model Context Protocol (MCP)
- Gumawa ng browser automation agents gamit ang Playwright
- Isama ang MCP servers sa iyong Microsoft Foundry Toolkit agents
- Palakasin ang iyong mga agent gamit ang external na data at mga kakayahan

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Pagtatanggi**:
Ang dokumentong ito ay isinalin gamit ang serbisyo ng AI translation na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagama't nagsusumikap kami para sa katumpakan, pakatandaan na ang awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o hindi pagkakatugma. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na pangunahing sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang maling pagkakaintindi o maling interpretasyon na nagmula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->