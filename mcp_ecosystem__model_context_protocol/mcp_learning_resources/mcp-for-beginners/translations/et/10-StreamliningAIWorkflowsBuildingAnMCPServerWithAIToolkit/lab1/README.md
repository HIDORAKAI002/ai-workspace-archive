# 🚀 Moodul 1: Microsoft Foundry Toolkit põhialused

[![Duration](https://img.shields.io/badge/Duration-15%20minutes-blue.svg)]()
[![Difficulty](https://img.shields.io/badge/Difficulty-Beginner-green.svg)]()
[![Prerequisites](https://img.shields.io/badge/Prerequisites-VS%20Code-orange.svg)]()

## 📋 Õpieesmärgid

Selle mooduli lõpuks suudad sa:
- ✅ Installida ja konfigureerida Microsoft Foundry Toolkit laienduse VS Code jaoks
- ✅ Navigeerida Mudelite kataloogis ja mõista erinevaid mudelite allikaid
- ✅ Kasutada mänguväljakut mudelite testimiseks ja katsetamiseks
- ✅ Luuia kohandatud tehisintellekti agente Agent Builderi abil
- ✅ Võrrelda mudelite jõudlust erinevate teenusepakkujate vahel
- ✅ Rakendada parimaid tavasid promptide loomisel

## 🧠 Sissejuhatus Microsoft Foundry Toolkiti

**Microsoft Foundry Toolkit laiendus VS Code’i jaoks** on Microsofti lipulaevlaiendus, mis muudab VS Code’i kõikehõlmavaks tehisintellekti arenduskeskkonnaks. See sillutab tehisintellekti uurimistöö ja praktilise rakenduste arendamise vahelise lõhe, muutes generatiivse AI kättesaadavaks arendajatele kõigil oskustasemetel.

### 🌟 Peamised Võimalused

| Funktsioon | Kirjeldus | Kasutusjuhtum |
|---------|-------------|----------|
| **🗂️ Mudelite kataloog** | Ligipääs 100+ mudelile GitHubist, ONNX-ist, OpenAI-st, Anthropicust, Google’ist | Mudelite avastamine ja valimine |
| **🔌 BYOM tugi** | Integreeri oma mudelid (kohalikud/kaugserveril) | Kohandatud mudelite kasutuselevõtt |
| **🎮 Interaktiivne mänguväljak** | Reaalajas mudelite testimine vestluse liidese kaudu | Kiire prototüüpimine ja testimine |
| **📎 Mitmemodaalne tugi** | Töötleb teksti, pilte ja manuseid | Komplekssed tehisintellekti rakendused |
| **⚡ Partiidena töötlemine** | Käivitab mitu prompti korraga | Tõhus testimisvoog |
| **📊 Mudelite hindamine** | Sisseehitatud mõõdikud (F1, asjakohasus, sarnasused, sidusus) | Jõudluse hindamine |

### 🎯 Miks Microsoft Foundry Toolkit on oluline

- **🚀 Kiirendatud arendus**: Ideest prototüübini minutitega
- **🔄 Ühtne töövoog**: Üks liides mitme AI pakkuja jaoks
- **🧪 Lihtne eksperimenteerimine**: Võrdle mudeleid ilma keeruka seadistuseta
- **📈 Tootmiseks valmis**: Sujuv üleminek prototüübist juurutusse

## 🛠️ Eeltingimused & seadistamine

### 📦 Installeeri Microsoft Foundry Toolkit laiendus

**Samm 1: Ava laienduste turg**
1. Ava Visual Studio Code
2. Liigu laienduste vaatesse (`Ctrl+Shift+X` või `Cmd+Shift+X`)
3. Otsi „Microsoft Foundry Toolkit“

**Samm 2: Vali oma versioon**
- **🟢 Vabastus**: Soovitatav tootmiskasutuseks
- **🔶 Eelversioon**: Varajane juurdepääs uuenduslikele funktsioonidele

**Samm 3: Paigalda ja aktiveeri**

![Microsoft Foundry Toolkit Extension](../../../../translated_images/et/aitkext.d28945a03eed003c.webp)

### ✅ Kontrollnimekiri
- [ ] Microsoft Foundry Toolkit ikoon on nähtav VS Code külgribal
- [ ] Laiendus on lubatud ja aktiveeritud
- [ ] Paigaldusvigasid ei ole väljundpaneelis

## 🧪 Praktiline harjutus 1: GitHubi mudelite uurimine

**🎯 Eesmärk**: Valda Mudelite kataloogi ja testi oma esimest AI mudelit

### 📊 Samm 1: Navigeeri Mudelite kataloogis

Mudelite kataloog on sinu värav tehisintellekti ökosüsteemi. See koondab mudeleid mitmetelt pakkujatelt, lihtsustades avastamist ja võrdlemist.

**🔍 Navigatsioonijuhend:**

Klõpsa Microsoft Foundry Toolkiti külgribal **MODELS - Catalog**

![Model Catalog](../../../../translated_images/et/aimodel.263ed2be013d8fb0.webp)

**💡 Näpunäide**: Otsi mudeleid, millel on spetsiifilised võimalused, mis sobivad sinu kasutusjuhtumiga (nt koodi genereerimine, loovkirjutamine, analüüs).

**⚠️ Märkus**: GitHubis majutatud mudelid (st GitHubi mudelid) on tasuta kasutamiseks, kuid nende kasutamist piirab kiirus- ja tokenipiirang. Kui soovid kasutada mitt-GitHubi mudeleid (välistel serveritel nagu Azure AI või muud lõpp-punktid), pead sisestama sobiva API võtme või autentsuse.

### 🚀 Samm 2: Lisa ja konfigureeri oma esimene mudel

**Mudeli valimise strateegia:**
- **GPT-4.1**: Parim keerukate arutluste ja analüüsi jaoks
- **Phi-4-mini**: Kerge, kiire vastustega lihtsate ülesannete jaoks

**🔧 Konfigureerimisprotsess:**
1. Vali kataloogist **OpenAI GPT-4.1**
2. Klõpsa **Lisa minu mudelite hulka** - see registreerib mudeli kasutamiseks
3. Vali **Proovi mänguväljakus**, et avada testikeskkond
4. Oota mudeli initsialiseerimist (esmane seadistus võib hetk aega võtta)

![Playground Setup](../../../../translated_images/et/playground.dd6f5141344878ca.webp)

**⚙️ Mudeli parameetrite mõistmine:**
- **Temperatuur**: Kontrollib loovust (0 = deterministlik, 1 = loominguline)
- **Max Tokens**: Maksimaalne vastuse pikkus
- **Top-p**: Ydinnäidis vastuse mitmekesisuse jaoks

### 🎯 Samm 3: Valda mänguväljaku liidest

Mänguväljak on sinu AI katselabor. Siin on, kuidas selle potentsiaali maksimeerida:

**🎨 Parimad tavad promptide loomisel:**
1. **Ole konkreetne**: Selged ja üksikasjalikud juhised annavad paremaid tulemusi
2. **Pakku konteksti**: Sisalda asjakohane taustinfo
3. **Kasuta näiteid**: Näita mudelile, mida soovid, näidete abil
4. **Itereeri**: Täienda prompti põhjal esialgseid tulemusi

**🧪 Teststsenaariumid:**
```markdown
# Example 1: Code Generation
"Write a Python function that calculates the factorial of a number using recursion. Include error handling and docstrings."

# Example 2: Creative Writing
"Write a professional email to a client explaining a project delay, maintaining a positive tone while being transparent about challenges."

# Example 3: Data Analysis
"Analyze this sales data and provide insights: [paste your data]. Focus on trends, anomalies, and actionable recommendations."
```

![Testing Results](../../../../translated_images/et/result.1dfcf211fb359cf6.webp)

### 🏆 Väljakutseharjutus: Mudelite jõudluse võrdlus

**🎯 Eesmärk**: Võrdle erinevaid mudeleid sama promptiga, et mõista nende tugevusi

**📋 Juhised:**
1. Lisa **Phi-4-mini** oma tööruumi
2. Kasuta sama prompti nii GPT-4.1 kui ka Phi-4-mini puhul

![set](../../../../translated_images/et/set.88132df189ecde2c.webp)

3. Võrdle vastuste kvaliteeti, kiirust ja täpsust
4. Kirjuta oma leiud tulemustesse

![Model Comparison](../../../../translated_images/et/compare.97746cd0f9074955.webp)

**💡 Olulised tähelepanekud:**
- Millal kasutada LLM-i vs SLM-i
- Kulude ja jõudluse kompromissid
- Eripärased võimed erinevate mudelite puhul

## 🤖 Praktiline harjutus 2: Kohandatud agentide loomine Agent Builderiga

**🎯 Eesmärk**: Loo spetsialiseeritud AI agendid kindlate ülesannete ja töövoogude jaoks

### 🏗️ Samm 1: Agent Builderi mõistmine

Agent Builder on koht, kus Microsoft Foundry Toolkit tõeliselt särab. See võimaldab luua eesmärgipäraseid tehisintellekti assistente, kes kombineerivad suurte keelemudelite jõu kohandatud juhiste, spetsiifiliste parameetrite ja eriteadmistega.

**🧠 Agendi arhitektuuri komponendid:**
- **Tuumikmudel**: Põhimudelisuur keelemudel (GPT-4, Groks, Phi jms)
- **Süsteemi prompt**: Defineerib agendi isiksuse ja käitumise
- **Parameetrid**: Täpsustatud seaded optimaalseks jõudluseks
- **Tööriistade integratsioon**: Ühenda väliste API-de ja MCP teenustega
- **Mälu**: Vestluse kontekst ja sessiooni püsivus

![Agent Builder Interface](../../../../translated_images/et/agentbuilder.25895b2d2f8c02e7.webp)

### ⚙️ Samm 2: Agentide konfiguratsiooni süvavaade

**🎨 Tõhusate süsteemi promptide loomine:**
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

*Muidugi võid ka kasutada Generate System Prompt funktsiooni, et lasta AI-l aidata promptide genereerimist ja optimeerimist*

**🔧 Parameetrite optimeerimine:**
| Parameeter | Soovituslik vahemik | Kasutusjuhtum |
|-----------|------------------|----------|
| **Temperatuur** | 0.1-0.3 | Tehnilised/faktipõhised vastused |
| **Temperatuur** | 0.7-0.9 | Loovad/ajurünnakuga ülesanded |
| **Max Tokens** | 500-1000 | Lühikesed vastused |
| **Max Tokens** | 2000-4000 | Üksikasjalikud seletused |

### 🐍 Samm 3: Praktiline harjutus - Python programmeerimise agent

**🎯 Missioon**: Loo spetsialiseeritud Python koodi assistent

**📋 Konfigureerimise sammud:**

1. **Mudeli valik**: Vali **Claude 3.5 Sonnet** (suurepärane koodi jaoks)

2. **Süsteemi promptide kujundamine**:
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

3. **Parameetrite seadistamine**:
   - Temperatuur: 0.2 (järjepidev, usaldusväärne kood)
   - Max Tokens: 2000 (üksikasjalikud seletused)
   - Top-p: 0.9 (tasakaalustatud loovus)

![Python Agent Configuration](../../../../translated_images/et/pythonagent.5e51b406401c165f.webp)

### 🧪 Samm 4: Testi oma Python agenti

**Teststsenaariumid:**
1. **Põhifunktsioon**: „Loo funktsioon algarvude leidmiseks“
2. **Keerukas algoritm**: „Rakenda binaarpuu päringupuuga: sisesta, kustuta, otsi meetodid“
3. **Reaalmaailma probleem**: „Loo veebikraaper, mis haldab päringute kiirusepiirangut ja proovib uuesti“
4. **Silumise**: „Paranda see kood [kleebi vigane kood]“

**🏆 Edukriteeriumid:**
- ✅ Kood töötab ilma vigadeta
- ✅ Sisaldab korralikku dokumentatsiooni
- ✅ Järgib Python parimaid tavasid
- ✅ Annab selged seletused
- ✅ Soovitab parendusi

## 🎓 Moodul 1 kokkuvõte ja järgmised sammud

### 📊 Teadmiste kontroll

Testi oma arusaamist:
- [ ] Kas suudad selgitada kataloogis mudelite erinevust?
- [ ] Kas oled edukalt loonud ja testinud kohandatud agenti?
- [ ] Kas mõistad, kuidas optimeerida parameetreid erinevate kasutusjuhtude jaoks?
- [ ] Kas suudad kujundada tõhusaid süsteemi promte?

### 📚 Lisamaterjalid

- **Microsoft Foundry Toolkit dokumentatsioon**: [Ametlik Microsoft Docs](https://github.com/microsoft/vscode-ai-toolkit)
- **Prompt Engineering juhend**: [Parimad tavad](https://platform.openai.com/docs/guides/prompt-engineering)
- **Mudelite ülevaade Microsoft Foundry Toolkitis**: [Mudelite areng](https://github.com/microsoft/vscode-ai-toolkit/blob/main/doc/models.md)

**🎉 Palju õnne!** Sa oled valdanud Microsoft Foundry Toolkiti põhialused ja oled valmis looma veelgi arenenumaid AI rakendusi!

### 🔜 Jätka järgmise mooduliga

Soovid edasijõudnutele mõeldud võimekusi? Jätka **[Moodul 2: MCP Microsoft Foundry Toolkit põhialused](../lab2/README.md)**, kus õpid, kuidas:
- Ühendada oma agendid väliste tööriistadega Model Context Protocol (MCP) abil
- Luua brauseri automaatika agente Playwrightiga
- Integreerida MCP servereid Microsoft Foundry Toolkit agentidega
- Võimendada oma agente välise andmevoo ja võimetega

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Lahtiütlus**:
See dokument on tõlgitud kasutades AI tõlketeenust [Co-op Translator](https://github.com/Azure/co-op-translator). Kuigi me püüdleme täpsuse poole, palun pange tähele, et automatiseeritud tõlgetes võib esineda vigu või ebatäpsusi. Originaaldokument selle emakeeles tuleks pidada autoriteetseks allikaks. Olulise teabe puhul soovitatakse kasutada professionaalset inimtõlget. Me ei vastuta selle tõlkega seotud eksimustest või valesti mõistmistest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->